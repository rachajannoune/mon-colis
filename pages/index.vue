<script setup lang="ts">
const numero = ref('')
const erreur = ref('')

const { derniersColis } = useDerniersColis()

const formatNumero = /^[A-Z]{2}\d{9}[A-Z]{2}$/

function suivreColis(): void {
  const numeroNormalise = numero.value.trim().toUpperCase()

  if (!formatNumero.test(numeroNormalise)) {
    erreur.value = 'Le numéro doit contenir 2 lettres, 9 chiffres et 2 lettres.'
    return
  }

  erreur.value = ''
  navigateTo(`/suivi/${numeroNormalise}`)
}
</script>

<template>
  <div>
    <section
      id="suivi"
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
    >
      <div class="h-2 bg-yellow-400" />

      <div class="px-6 py-10 md:px-10 lg:flex lg:items-center lg:gap-10">
        <div class="lg:w-2/5">
          <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
            Suivi de votre envoi
          </p>

          <h1 class="mt-2 text-3xl font-bold text-blue-900 md:text-4xl">
            Suivre un courrier ou un colis
          </h1>

          <p class="mt-3 text-gray-600">
            Renseignez votre numéro de suivi pour consulter son statut
            et les différentes étapes de livraison.
          </p>
        </div>

        <form
          class="mt-8 lg:mt-0 lg:flex-1"
          @submit.prevent="suivreColis"
        >
          <label
            for="numero-colis"
            class="block text-sm font-semibold text-gray-800"
          >
            Numéro de suivi
          </label>

          <div class="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="numero-colis"
              v-model="numero"
              type="text"
              placeholder="Exemple : LA123456789FR"
              autocomplete="off"
              class="min-w-0 flex-1 rounded-lg border border-gray-400 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
              :aria-invalid="Boolean(erreur)"
              aria-describedby="erreur-numero"
            >

            <button
              type="submit"
              class="rounded-lg bg-yellow-400 px-7 py-3.5 font-bold text-blue-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            >
              Suivre votre envoi
            </button>
          </div>

          <p
            v-if="erreur"
            id="erreur-numero"
            class="mt-3 text-sm font-semibold text-red-700"
            role="alert"
          >
            {{ erreur }}
          </p>
        </form>
      </div>
    </section>

    <section class="mt-12">
      <div class="text-center">
        <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
          Services rapides
        </p>

        <h2 class="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Comment pouvons-nous vous aider ?
        </h2>
      </div>

      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <NuxtLink
          to="/#suivi"
          class="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <span
            class="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
              <path d="M3 7.5V17l9 4 9-4V7.5" />
              <path d="M12 12v9" />
              <path d="m8 5 9 4.5" />
            </svg>
          </span>

          <h3 class="mt-5 text-xl font-bold text-blue-900">
            Suivre un colis
          </h3>

          <p class="mt-2 leading-6 text-gray-600">
            Consultez le statut et les étapes de livraison de votre colis.
          </p>

          <span class="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700">
            Accéder au suivi
            <span aria-hidden="true">→</span>
          </span>
        </NuxtLink>

        <NuxtLink
          to="/bureaux"
          class="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <span
            class="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>

          <h3 class="mt-5 text-xl font-bold text-blue-900">
            Trouver un bureau
          </h3>

          <p class="mt-2 leading-6 text-gray-600">
            Recherchez un bureau par code postal et par service disponible.
          </p>

          <span class="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700">
            Localiser un bureau
            <span aria-hidden="true">→</span>
          </span>
        </NuxtLink>

        <NuxtLink
          to="/tarifs"
          class="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <span
            class="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
              <path d="M7 7h10" />
              <path d="M8 12h2" />
              <path d="M14 12h2" />
              <path d="M8 16h2" />
              <path d="M14 16h2" />
            </svg>
          </span>

          <h3 class="mt-5 text-xl font-bold text-blue-900">
            Calculer un tarif
          </h3>

          <p class="mt-2 leading-6 text-gray-600">
            Estimez le prix de votre lettre ou de votre colis avant l’envoi.
          </p>

          <span class="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700">
            Simuler un tarif
            <span aria-hidden="true">→</span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <section
      v-if="derniersColis.length"
      class="mt-12 rounded-2xl border border-gray-200 bg-white p-7"
    >
      <h2 class="text-2xl font-bold text-gray-900">
        Derniers colis consultés
      </h2>

      <p class="mt-2 text-gray-600">
        Retrouvez rapidement vos dernières recherches.
      </p>

      <ul class="mt-5 flex flex-wrap gap-3">
        <li
          v-for="numeroColis in derniersColis"
          :key="numeroColis"
        >
          <NuxtLink
            :to="`/suivi/${numeroColis}`"
            class="block rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-semibold text-blue-900 transition hover:border-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            {{ numeroColis }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>