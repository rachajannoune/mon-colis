<script setup lang="ts">
import type {
  DestinationTarif,
  TypeEnvoi
} from '~/types/shared'

// Valeurs du formulaire.
const typeEnvoi = ref<TypeEnvoi>('lettre')
const poidsG = ref<number | null>(null)
const destination = ref<DestinationTarif>('france')
const avecSuivi = ref(false)

// Message lié à la validation côté frontend.
const erreurValidation = ref('')

// Le composable gère l’appel à POST /api/tarifs.
const {
  resultat,
  pending,
  erreur,
  calculerTarif
} = useTarif()

async function soumettreSimulation(): Promise<void> {
  // Efface une ancienne erreur de validation.
  erreurValidation.value = ''

  // Vérifie que le poids est renseigné et supérieur à zéro.
  if (
    poidsG.value === null
    || poidsG.value <= 0
  ) {
    erreurValidation.value = 'Saisissez un poids supérieur à zéro.'
    return
  }

  // Transmet les valeurs du formulaire au composable.
  await calculerTarif({
    typeEnvoi: typeEnvoi.value,
    poidsG: poidsG.value,
    destination: destination.value,
    avecSuivi: avecSuivi.value
  })
}
</script>

<template>
  <section>
    <header class="mb-8">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Simulation d’envoi
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-900">
        Calculer un tarif
      </h1>

      <p class="mt-3 max-w-2xl text-gray-600">
        Estimez le prix de votre envoi selon son type, son poids,
        sa destination et l’option de suivi.
      </p>
    </header>

    <div class="grid gap-8 lg:grid-cols-3">
      <form
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2"
        @submit.prevent="soumettreSimulation"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="type-envoi"
              class="block text-sm font-semibold text-gray-800"
            >
              Type d’envoi
            </label>

            <select
              id="type-envoi"
              v-model="typeEnvoi"
              class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
            >
              <option value="lettre">
                Lettre
              </option>

              <option value="colis">
                Colis
              </option>
            </select>
          </div>

          <div>
            <label
              for="poids"
              class="block text-sm font-semibold text-gray-800"
            >
              Poids en grammes
            </label>

            <input
              id="poids"
              v-model.number="poidsG"
              type="number"
              min="1"
              step="1"
              placeholder="Exemple : 500"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
              :aria-invalid="Boolean(erreurValidation)"
              aria-describedby="erreur-tarif"
            >
          </div>

          <div>
            <label
              for="destination"
              class="block text-sm font-semibold text-gray-800"
            >
              Destination
            </label>

            <select
              id="destination"
              v-model="destination"
              class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
            >
              <option value="france">
                France
              </option>

              <option value="ue">
                Union européenne
              </option>

              <option value="monde">
                Monde
              </option>
            </select>
          </div>

          <div class="flex items-end">
            <label
              for="avec-suivi"
              class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3"
            >
              <input
                id="avec-suivi"
                v-model="avecSuivi"
                type="checkbox"
                class="size-5 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
              >

              <span class="font-semibold text-gray-800">
                Ajouter le suivi
              </span>
            </label>
          </div>
        </div>

        <p
          v-if="erreurValidation"
          id="erreur-tarif"
          class="mt-5 text-sm font-semibold text-red-700"
          role="alert"
        >
          {{ erreurValidation }}
        </p>

        <p
          v-else-if="erreur"
          class="mt-5 text-sm font-semibold text-red-700"
          role="alert"
        >
          {{ erreur }}
        </p>

        <button
          type="submit"
          :disabled="pending"
          class="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-blue-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ pending ? 'Calcul en cours...' : 'Calculer le tarif' }}
        </button>
      </form>

      <aside
        class="rounded-2xl border border-gray-200 bg-blue-900 p-6 text-white shadow-sm"
      >
        <p class="text-sm font-bold uppercase tracking-wider text-blue-200">
          Tarif estimé
        </p>

        <div v-if="resultat">
          <p class="mt-4 text-4xl font-bold text-yellow-400">
            {{ resultat.prix.toFixed(2) }} €
          </p>

          <p class="mt-3 text-blue-100">
            Prix calculé selon les informations renseignées.
          </p>
        </div>

        <div v-else>
          <p class="mt-4 text-blue-100">
            Complétez le formulaire pour obtenir une estimation.
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>