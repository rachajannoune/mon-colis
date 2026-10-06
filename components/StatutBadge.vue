<script setup lang="ts">
import type { StatutColis } from '~/types/shared'

const props = defineProps<{
  statut: StatutColis
}>()

const informationsStatut: Record<
  StatutColis,
  {
    libelle: string
    classes: string
  }
> = {
  pris_en_charge: {
    libelle: 'Pris en charge',
    classes: 'bg-gray-100 text-gray-800'
  },
  en_transit: {
    libelle: 'En transit',
    classes: 'bg-blue-100 text-blue-800'
  },
  en_cours_de_livraison: {
    libelle: 'En cours de livraison',
    classes: 'bg-yellow-100 text-yellow-900'
  },
  livre: {
    libelle: 'Livré',
    classes: 'bg-green-100 text-green-800'
  },
  avis_de_passage: {
    libelle: 'Avis de passage',
    classes: 'bg-orange-100 text-orange-800'
  }
}

const statutAffiche = computed(
  () => informationsStatut[props.statut]
)
</script>

<template>
  <span
    class="inline-flex rounded-full px-3 py-1 text-sm font-semibold"
    :class="statutAffiche.classes"
  >
    {{ statutAffiche.libelle }}
  </span>
</template>