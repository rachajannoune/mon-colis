<script setup lang="ts">
import type { Colis } from '~/types/shared'

const props = defineProps<{
  colis: Colis
  suppressionEnCours: boolean
}>()

const emit = defineEmits<{
  retirer: [numero: string]
}>()

const { $formatDate } = useNuxtApp()

function demanderSuppression(): void {
  emit('retirer', props.colis.numero)
}
</script>

<template>
  <article
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
          {{ $formatDate(colis.dateLivraisonPrevue) }}
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
        :disabled="suppressionEnCours"
        class="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        @click="demanderSuppression"
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

        {{ suppressionEnCours ? 'Suppression...' : 'Retirer' }}
      </button>
    </div>
  </article>
</template>