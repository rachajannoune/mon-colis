<script setup lang="ts">
import type {
  HorairesBureau,
  JourSemaine
} from '~/types/shared'

const props = defineProps<{
  horaires: HorairesBureau
}>()

const jours: JourSemaine[] = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi'
]

const estOuvert = ref(false)

function convertirEnMinutes(heure: string): number {
  const [heures = 0, minutes = 0] = heure
    .split(':')
    .map(Number)

  return heures * 60 + minutes
}

function verifierOuverture(): void {
  const maintenant = new Date()
  const jourActuel = jours[maintenant.getDay()]
  const creneaux = props.horaires[jourActuel]

  const minutesActuelles
    = maintenant.getHours() * 60 + maintenant.getMinutes()

  estOuvert.value = creneaux.some((creneau) => {
    const [ouverture, fermeture] = creneau.split('-')

    if (!ouverture || !fermeture) {
      return false
    }

    return (
      minutesActuelles >= convertirEnMinutes(ouverture)
      && minutesActuelles < convertirEnMinutes(fermeture)
    )
  })
}

let intervalle: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  verifierOuverture()

  intervalle = setInterval(
    verifierOuverture,
    60_000
  )
})

onUnmounted(() => {
  if (intervalle) {
    clearInterval(intervalle)
  }
})
</script>

<template>
  <span
    class="inline-flex rounded-full px-3 py-1 text-sm font-semibold"
    :class="estOuvert
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'"
  >
    {{ estOuvert ? 'Ouvert maintenant' : 'Fermé actuellement' }}
  </span>
</template>