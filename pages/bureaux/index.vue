<script setup lang="ts">
import type { ServiceBureau } from '~/types/shared'

const route = useRoute()
const router = useRouter()

const servicesValides: ServiceBureau[] = [
  'retrait',
  'affranchissement',
  'banque'
]

const codePostal = ref(
  typeof route.query.codePostal === 'string'
    ? route.query.codePostal
    : ''
)

const service = ref<ServiceBureau | ''>(
  typeof route.query.service === 'string'
  && servicesValides.includes(route.query.service as ServiceBureau)
    ? route.query.service as ServiceBureau
    : ''
)

const codePostalRecherche = computed(() =>
  typeof route.query.codePostal === 'string'
    ? route.query.codePostal
    : ''
)

const serviceRecherche = computed<ServiceBureau | ''>(() =>
  typeof route.query.service === 'string'
  && servicesValides.includes(route.query.service as ServiceBureau)
    ? route.query.service as ServiceBureau
    : ''
)

watch(
  [codePostalRecherche, serviceRecherche],
  ([nouveauCodePostal, nouveauService]) => {
    codePostal.value = nouveauCodePostal
    service.value = nouveauService
  }
)

const {
  data: bureaux,
  pending,
  error
} = await useBureaux(
  codePostalRecherche,
  serviceRecherche
)

async function rechercherBureaux(): Promise<void> {
  const codePostalNormalise = codePostal.value.trim()

  await router.push({
    query: {
      ...(codePostalNormalise && {
        codePostal: codePostalNormalise
      }),

      ...(service.value && {
        service: service.value
      })
    }
  })
}
</script>

<template>
  <section>
    <header class="mb-8">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Bureaux de poste
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-900">
        Trouver un bureau
      </h1>

      <p class="mt-3 max-w-2xl text-gray-600">
        Recherchez un bureau de poste par code postal et par service disponible.
      </p>
    </header>

    <form
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="rechercherBureaux"
    >
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <label
            for="code-postal"
            class="block text-sm font-semibold text-gray-800"
          >
            Code postal
          </label>

          <input
            id="code-postal"
            v-model="codePostal"
            type="text"
            inputmode="numeric"
            maxlength="5"
            placeholder="Exemple : 77100"
            class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
          >
        </div>

        <div>
          <label
            for="service"
            class="block text-sm font-semibold text-gray-800"
          >
            Service
          </label>

          <select
            id="service"
            v-model="service"
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">
              Tous les services
            </option>

            <option value="retrait">
              Retrait
            </option>

            <option value="affranchissement">
              Affranchissement
            </option>

            <option value="banque">
              Banque
            </option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        class="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-blue-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
      >
        Rechercher
      </button>
    </form>

    <div class="mt-10">
      <div
        v-if="pending"
        class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600"
        role="status"
      >
        Recherche des bureaux en cours...
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-6"
        role="alert"
      >
        <h2 class="font-bold text-red-800">
          Impossible de récupérer les bureaux
        </h2>

        <p class="mt-2 text-red-700">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      </div>

      <div
        v-else-if="bureaux && bureaux.length === 0"
        class="rounded-xl border border-gray-200 bg-white p-8 text-center"
      >
        <h2 class="text-xl font-bold text-gray-900">
          Aucun bureau trouvé
        </h2>

        <p class="mt-2 text-gray-600">
          Modifiez le code postal ou le service sélectionné.
        </p>
      </div>

      <div v-else-if="bureaux">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-2xl font-bold text-gray-900">
            Résultats
          </h2>

          <p class="text-sm font-medium text-gray-600">
            {{ bureaux.length }}
            {{ bureaux.length > 1 ? 'bureaux trouvés' : 'bureau trouvé' }}
          </p>
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BureauCard
            v-for="bureau in bureaux"
            :key="bureau.id"
            :bureau="bureau"
          />
        </div>
      </div>
    </div>
  </section>
</template>