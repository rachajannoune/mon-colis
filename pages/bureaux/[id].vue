<script setup lang="ts">
import type { Bureau } from '~/types/shared'

// Permet de récupérer l’identifiant du bureau présent dans l’URL.
const route = useRoute()

// Permet d’accéder au chemin public de l’API défini dans runtimeConfig.
const config = useRuntimeConfig()

// Récupère l’identifiant depuis la route dynamique /bureaux/[id].
// String() garantit que la valeur utilisée est une chaîne.
const id = computed(() =>
  String(route.params.id)
)

// Récupère tous les bureaux depuis le backend.
// bureaux contient le résultat.
// pending indique si la requête est en cours.
// error contient l’erreur éventuelle.
const {
  data: bureaux,
  pending,
  error
} = await useAsyncData<Bureau[]>(
  'bureaux-detail',
  () => $fetch<Bureau[]>(
    `${config.public.apiBase}/bureaux`
  )
)

// Recherche dans le tableau le bureau dont l’identifiant
// correspond à celui présent dans l’URL.
const bureau = computed(() =>
  bureaux.value?.find(
    bureauEnregistre => bureauEnregistre.id === id.value
  )
)
</script>

<template>
  <section>
    <NuxtLink
      to="/bureaux"
      class="inline-flex items-center gap-2 rounded-md font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
    >
      <span aria-hidden="true">←</span>
      Retour aux bureaux
    </NuxtLink>

    <!-- État affiché pendant l’appel au backend. -->
    <div
      v-if="pending"
      class="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600"
      role="status"
    >
      Chargement du bureau...
    </div>

    <!-- État affiché si l’appel à l’API échoue. -->
    <div
      v-else-if="error"
      class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6"
      role="alert"
    >
      <h1 class="text-xl font-bold text-red-800">
        Impossible de récupérer le bureau
      </h1>

      <p class="mt-2 text-red-700">
        Une erreur est survenue. Veuillez réessayer.
      </p>
    </div>

    <!--
      Ce cas signifie que l’API a répondu correctement,
      mais qu’aucun bureau ne possède l’identifiant demandé.
    -->
    <div
      v-else-if="!bureau"
      class="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center"
    >
      <h1 class="text-2xl font-bold text-gray-900">
        Bureau introuvable
      </h1>

      <p class="mt-2 text-gray-600">
        Le bureau demandé n’existe pas.
      </p>
    </div>

    <!-- Ce bloc est affiché uniquement si le bureau existe. -->
    <article
      v-else
      class="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <header class="border-b border-gray-200 bg-blue-900 px-6 py-8 text-white">
        <p class="text-sm font-bold uppercase tracking-wider text-blue-200">
          Bureau de poste
        </p>

        <h1 class="mt-2 text-3xl font-bold">
          {{ bureau.nom }}
        </h1>

        <address class="mt-4 not-italic text-blue-100">
          {{ bureau.adresse }}<br>
          {{ bureau.codePostal }} {{ bureau.ville }}
        </address>

        <!--
          Le calcul dépend de l’heure locale du navigateur.
          ClientOnly évite une différence entre le rendu serveur
          et le rendu dans le navigateur.
        -->
        <ClientOnly>
          <div class="mt-5">
            <BureauOuverture :horaires="bureau.horaires" />
          </div>

          <!-- Affichage temporaire avant le montage côté client. -->
          <template #fallback>
            <div class="mt-5">
              <span
                class="inline-flex rounded-full bg-blue-800 px-3 py-1 text-sm font-semibold text-blue-100"
              >
                Vérification des horaires...
              </span>
            </div>
          </template>
        </ClientOnly>
      </header>

      <div class="grid gap-10 p-6 lg:grid-cols-2">
        <section>
          <h2 class="text-xl font-bold text-blue-900">
            Services disponibles
          </h2>

          <!-- Un badge est créé pour chaque service du bureau. -->
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="serviceBureau in bureau.services"
              :key="serviceBureau"
              class="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800"
            >
              {{ serviceBureau }}
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-blue-900">
            Horaires d’ouverture
          </h2>

          <!--
            jour contient lundi, mardi, etc.
            creneaux contient les horaires correspondants.
          -->
          <dl class="mt-4 divide-y divide-gray-200">
            <div
              v-for="(creneaux, jour) in bureau.horaires"
              :key="jour"
              class="flex items-start justify-between gap-4 py-3"
            >
              <dt class="font-semibold capitalize text-gray-800">
                {{ jour }}
              </dt>

              <dd class="text-right text-gray-600">
                <!-- Affiche les créneaux lorsqu’ils existent. -->
                <span v-if="creneaux.length">
                  {{ creneaux.join(' / ') }}
                </span>

                <!-- Un tableau vide signifie que le bureau est fermé. -->
                <span
                  v-else
                  class="font-medium text-red-700"
                >
                  Fermé
                </span>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </article>
  </section>
</template>