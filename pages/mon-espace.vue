<script setup lang="ts">
// Applique le middleware auth avant d’afficher la page.
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
</script>

<template>
  <section>
    <header class="mb-8">
      <p class="text-sm font-bold uppercase tracking-wider text-blue-700">
        Espace personnel
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-900">
        Mes colis
      </h1>

      <p class="mt-3 text-gray-600">
        Bienvenue
        <span v-if="authStore.utilisateur">
          {{ authStore.utilisateur.nom }}
        </span>
        dans votre espace de suivi.
      </p>
    </header>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p class="text-gray-600">
        La gestion de vos colis suivis sera ajoutée à l’étape 8.
      </p>
    </div>
  </section>
</template>