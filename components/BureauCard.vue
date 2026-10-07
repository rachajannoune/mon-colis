<script setup lang="ts">
import type { Bureau, ServiceBureau } from '~/types/shared'

defineProps<{
  bureau: Bureau
}>()

const libellesServices: Record<ServiceBureau, string> = {
  retrait: 'Retrait',
  affranchissement: 'Affranchissement',
  banque: 'Banque'
}
</script>

<template>
  <article
    class="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
  >
    <div class="flex items-start gap-4">
      <span
        class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-7"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>

      <div>
        <h2 class="text-xl font-bold text-blue-900">
          {{ bureau.nom }}
        </h2>

        <address class="mt-2 not-italic leading-6 text-gray-600">
          {{ bureau.adresse }}<br>
          {{ bureau.codePostal }} {{ bureau.ville }}
        </address>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="text-sm font-semibold text-gray-700">
        Services disponibles
      </h3>

      <ul class="mt-3 flex flex-wrap gap-2">
        <li
          v-for="serviceBureau in bureau.services"
          :key="serviceBureau"
          class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800"
        >
          {{ libellesServices[serviceBureau] }}
        </li>
      </ul>
    </div>

    <NuxtLink
      :to="`/bureaux/${bureau.id}`"
      class="mt-6 inline-flex items-center gap-2 self-start font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
    >
      Voir les détails
      <span aria-hidden="true">→</span>
    </NuxtLink>
  </article>
</template>
