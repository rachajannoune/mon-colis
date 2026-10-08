<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Mes colis suivis | Mon Colis',
  description: 'Consultez, ajoutez et retirez les colis enregistrés dans votre espace personnel.',
  ogTitle: 'Mes colis suivis | Mon Colis',
  ogDescription: 'Consultez, ajoutez et retirez les colis enregistrés dans votre espace personnel.',
  ogType: 'website',
  robots: 'noindex, nofollow'
})

const authStore = useAuthStore()

const nouveauNumero = ref('')
const erreurValidation = ref('')

const formatNumero = /^[A-Z]{2}\d{9}[A-Z]{2}$/

const {
  colisSuivis,
  pending,
  error,
  actionPending,
  erreurAction,
  ajouterColis,
  supprimerColis
} = await useMesColis()

async function soumettreAjout(): Promise<void> {
  const numeroNormalise = nouveauNumero.value
    .trim()
    .toUpperCase()

  erreurValidation.value = ''

  if (!formatNumero.test(numeroNormalise)) {
    erreurValidation.value
      = 'Le numéro doit contenir 2 lettres, 9 chiffres et 2 lettres.'
    return
  }

  const ajoutReussi = await ajouterColis(numeroNormalise)

  if (ajoutReussi) {
    nouveauNumero.value = ''
  }
}

async function retirerColis(numero: string): Promise<void> {
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

      <p
        v-if="erreurValidation"
        id="erreur-ajout-colis"
        class="mt-4 text-sm font-semibold text-red-700"
        role="alert"
      >
        {{ erreurValidation }}
      </p>

      <p
        v-else-if="erreurAction"
        id="erreur-ajout-colis"
        class="mt-4 text-sm font-semibold text-red-700"
        role="alert"
      >
        {{ erreurAction }}
      </p>
    </form>

    <div
      v-if="pending"
      class="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600"
      role="status"
    >
      Chargement de vos colis...
    </div>

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
        <ColisSuiviCard
          v-for="colis in colisSuivis"
          :key="colis.numero"
          :colis="colis"
          :suppression-en-cours="actionPending"
          @retirer="retirerColis"
        />
      </div>
    </div>
  </section>
</template>