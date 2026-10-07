<script setup lang="ts">
// Exécute le middleware auth avant d’autoriser l’accès à la page.
definePageMeta({
  middleware: 'auth'
})

// Récupère les informations de l’utilisateur depuis le store Pinia.
const authStore = useAuthStore()

// Numéro saisi dans le formulaire d’ajout.
const nouveauNumero = ref('')

// Message d’erreur de validation côté frontend.
const erreurValidation = ref('')

// Format attendu : 2 lettres, 9 chiffres et 2 lettres.
const formatNumero = /^[A-Z]{2}\d{9}[A-Z]{2}$/

// Récupère la liste des colis et les actions du composable.
const {
  colisSuivis,
  pending,
  error,
  actionPending,
  erreurAction,
  ajouterColis,
  supprimerColis
} = await useMesColis()

// Valide le numéro puis demande son ajout au backend.
async function soumettreAjout(): Promise<void> {
  // Supprime les espaces et transforme les lettres en majuscules.
  const numeroNormalise = nouveauNumero.value
    .trim()
    .toUpperCase()

  // Supprime une ancienne erreur de validation.
  erreurValidation.value = ''

  // Vérifie le format avant d’appeler l’API.
  if (!formatNumero.test(numeroNormalise)) {
    erreurValidation.value
      = 'Le numéro doit contenir 2 lettres, 9 chiffres et 2 lettres.'
    return
  }

  // Appelle POST /api/mes-colis grâce au composable.
  const ajoutReussi = await ajouterColis(numeroNormalise)

  // Vide le champ uniquement après un ajout réussi.
  if (ajoutReussi) {
    nouveauNumero.value = ''
  }
}

// Demande au backend de retirer le colis sélectionné.
async function retirerColis(numero: string): Promise<void> {
  // Appelle DELETE /api/mes-colis grâce au composable.
  await supprimerColis(numero)
}
</script>

<template>
  <section>
    <header class="mb-8">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Espace personnel
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-900">
        Mes colis suivis
      </h1>

      <p class="mt-3 text-gray-600">
        <template v-if="authStore.utilisateur">
          Bienvenue {{ authStore.utilisateur.nom }}.
        </template>

        Retrouvez ici les colis enregistrés dans votre espace.
      </p>
    </header>

    <!-- Formulaire d’ajout d’un colis -->
    <form
      class="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="soumettreAjout"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div class="flex-1">
          <label
            for="nouveau-colis"
            class="block text-sm font-semibold text-gray-800"
          >
            Ajouter un colis
          </label>

          <input
            id="nouveau-colis"
            v-model="nouveauNumero"
            type="text"
            autocomplete="off"
            placeholder="Exemple : LA123456789FR"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
            :aria-invalid="Boolean(erreurValidation || erreurAction)"
            aria-describedby="erreur-ajout-colis"
          >
        </div>

        <button
          type="submit"
          :disabled="actionPending"
          class="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-blue-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{
            actionPending
              ? 'Ajout en cours...'
              : 'Ajouter le colis'
          }}
        </button>
      </div>

      <!-- Erreur détectée avant l’appel API -->
      <p
        v-if="erreurValidation"
        id="erreur-ajout-colis"
        class="mt-4 text-sm font-semibold text-red-700"
        role="alert"
      >
        {{ erreurValidation }}
      </p>

      <!-- Erreur retournée pendant une action backend -->
      <p
        v-else-if="erreurAction"
        id="erreur-ajout-colis"
        class="mt-4 text-sm font-semibold text-red-700"
        role="alert"
      >
        {{ erreurAction }}
      </p>
    </form>

    <!-- Chargement initial avec GET /api/mes-colis -->
    <div
      v-if="pending"
      class="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600"
      role="status"
    >
      Chargement de vos colis...
    </div>

    <!-- Erreur pendant le chargement initial -->
    <div
      v-else-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 p-6"
      role="alert"
    >
      <h2 class="font-bold text-red-800">
        Impossible de récupérer vos colis
      </h2>

      <p class="mt-2 text-red-700">
        Vérifiez votre connexion puis réessayez.
      </p>
    </div>

    <!-- La requête fonctionne, mais aucun colis n’est enregistré -->
    <div
      v-else-if="colisSuivis.length === 0"
      class="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
    >
      <span
        class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-9"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
          <path d="M3 7.5V17l9 4 9-4V7.5" />
          <path d="M12 12v9" />
        </svg>
      </span>

      <h2 class="mt-5 text-xl font-bold text-gray-900">
        Aucun colis suivi
      </h2>

      <p class="mt-2 text-gray-600">
        Ajoutez un numéro de suivi pour retrouver votre colis ici.
      </p>
    </div>

    <!-- Liste des colis retournés par GET /api/mes-colis -->
    <div v-else>
      <div class="mb-6 flex items-center justify-between gap-4">
        <h2 class="text-2xl font-bold text-gray-900">
          Votre sélection
        </h2>

        <p class="text-sm font-medium text-gray-600">
          {{ colisSuivis.length }}
          {{
            colisSuivis.length > 1
              ? 'colis suivis'
              : 'colis suivi'
          }}
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="colis in colisSuivis"
          :key="colis.numero"
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">
                Numéro de suivi
              </p>

              <h3 class="mt-1 font-bold text-blue-900">
                {{ colis.numero }}
              </h3>
            </div>

            <StatutBadge :statut="colis.statut" />
          </div>

          <dl class="mt-6 space-y-4">
            <div>
              <dt class="text-sm font-semibold text-gray-500">
                Livraison prévue
              </dt>

              <dd class="mt-1 text-gray-900">
                {{ colis.dateLivraisonPrevue }}
              </dd>
            </div>

            <div>
              <dt class="text-sm font-semibold text-gray-500">
                Destination
              </dt>

              <dd class="mt-1 text-gray-900">
                {{ colis.destinataire.codePostal }}
                {{ colis.destinataire.ville }}
              </dd>
            </div>
          </dl>

          <!-- Actions disponibles pour ce colis -->
          <div class="mt-6 flex flex-wrap items-center gap-4">
            <NuxtLink
              :to="`/suivi/${colis.numero}`"
              class="inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Voir le suivi
              <span aria-hidden="true">→</span>
            </NuxtLink>

            <button
              type="button"
              :disabled="actionPending"
              class="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              @click="retirerColis(colis.numero)"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M4 7h16" />
                <path d="M9 7V4h6v3" />
                <path d="m7 7 1 13h8l1-13" />
              </svg>

              Retirer
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>