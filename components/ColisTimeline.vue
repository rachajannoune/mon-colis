<script setup lang="ts">
import type { EvenementColis } from '~/types/shared'

defineProps<{
  evenements: EvenementColis[]
}>()
</script>

<template>
  <section>
    <h2 class="text-xl font-bold text-blue-900">
      Historique du colis
    </h2>

    <ol class="mt-6 space-y-6">
      <li
        v-for="(evenement, index) in evenements"
        :key="`${evenement.date}-${index}`"
        class="relative flex gap-4"
      >
        <div class="flex flex-col items-center">
          <span
            class="mt-1 size-4 shrink-0 rounded-full bg-blue-700 ring-4 ring-blue-100"
            aria-hidden="true"
          />

          <span
            v-if="index < evenements.length - 1"
            class="mt-2 h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        </div>

        <div class="pb-4">
          <h3 class="font-bold text-gray-900">
            {{ evenement.libelle }}
          </h3>

          <p class="mt-1 text-sm text-gray-600">
            {{ evenement.lieu }}
          </p>

          <time
            :datetime="evenement.date"
            class="mt-1 block text-sm text-gray-500"
          >
            {{ new Date(evenement.date).toLocaleString('fr-FR') }}
          </time>
        </div>
      </li>
    </ol>
  </section>
</template>