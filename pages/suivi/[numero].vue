<script setup lang="ts">
const route = useRoute()

const numero = computed(() =>
  String(route.params.numero).trim().toUpperCase()
)

const {
  data: colis,
  pending,
  error
} = await useSuiviColis(numero.value)

const { ajouterDernierColis } = useDerniersColis()

watch(
  colis,
  (colisCharge) => {
    if (colisCharge) {
      ajouterDernierColis(colisCharge.numero)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <section>
    <header class="mb-8">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Suivi de votre envoi
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-900">
        Colis {{ numero }}
      </h1>
    </header>

    <div
      v-if="pending"
      class="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600"
      role="status"
    >
      Chargement du colis...
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-6"
      role="alert"
    >
      <h2 class="font-bold text-red-800">
        Colis introuvable
      </h2>

      <p class="mt-2 text-red-700">
        Vérifiez le numéro saisi puis réessayez.
      </p>

      <NuxtLink
        to="/#suivi"
        class="mt-5 inline-block rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        Effectuer une nouvelle recherche
      </NuxtLink>
    </div>

    <div
      v-else-if="colis"
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div class="border-b border-gray-200 pb-5">
        <p class="text-sm text-gray-500">
          Statut actuel
        </p>

        <div class="mt-2">
          <StatutBadge :statut="colis.statut" />
        </div>
      </div>

      <dl class="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <dt class="text-sm font-semibold text-gray-500">
            Livraison prévue
          </dt>

          <dd class="mt-1 font-medium text-gray-900">
            {{ colis.dateLivraisonPrevue }}
          </dd>
        </div>

        <div>
          <dt class="text-sm font-semibold text-gray-500">
            Destination
          </dt>

          <dd class="mt-1 font-medium text-gray-900">
            {{ colis.destinataire.adresse }},
            {{ colis.destinataire.codePostal }}
            {{ colis.destinataire.ville }}
          </dd>
        </div>
      </dl>

      <div class="mt-8 border-t border-gray-200 pt-8">
        <ColisTimeline :evenements="colis.evenements" />
      </div>
    </div>
  </section>
</template>