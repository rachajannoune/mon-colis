<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const estColisIntrouvable = computed(() =>
  props.error.statusCode === 404
  && props.error.statusMessage === 'Colis introuvable'
)

function quitterErreur(): void {
  clearError({
    redirect: estColisIntrouvable.value ? '/#suivi' : '/'
  })
}
</script>

<template>
  <NuxtLayout>
    <section class="mx-auto max-w-2xl py-16 text-center">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Erreur {{ error.statusCode }}
      </p>

      <h1 class="mt-3 text-4xl font-bold text-blue-900">
        {{
          estColisIntrouvable
            ? 'Colis introuvable'
            : error.statusCode === 404
              ? 'Page introuvable'
              : 'Une erreur est survenue'
        }}
      </h1>

      <p class="mt-4 text-gray-600">
        {{
          estColisIntrouvable
            ? 'Vérifiez le numéro saisi puis réessayez.'
            : error.statusCode === 404
              ? 'La page demandée n’existe pas ou a été déplacée.'
              : 'Nous ne pouvons pas afficher cette page pour le moment.'
        }}
      </p>

      <button
        type="button"
        class="mt-8 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-blue-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        @click="quitterErreur"
      >
        {{
          estColisIntrouvable
            ? 'Effectuer une nouvelle recherche'
            : 'Retourner à l’accueil'
        }}
      </button>
    </section>
  </NuxtLayout>
</template>