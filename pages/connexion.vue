<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Connexion | Mon Colis',
  description: 'Connectez-vous à votre espace personnel pour consulter et gérer vos colis suivis.',
  ogTitle: 'Connexion | Mon Colis',
  ogDescription: 'Connectez-vous à votre espace personnel pour consulter et gérer vos colis suivis.',
  ogType: 'website',
  robots: 'noindex, nofollow'
})

const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const motDePasse = ref('')
const afficherMotDePasse = ref(false)

async function soumettreConnexion(): Promise<void> {
  const connexionReussie = await authStore.connecter(
    email.value.trim().toLowerCase(),
    motDePasse.value
  )

  if (!connexionReussie) {
    return
  }

  const destination = typeof route.query.redirect === 'string'
    ? route.query.redirect
    : '/mon-espace'

  await navigateTo(destination)
}
</script>

<template>
  <section>
    <div class="text-center sm:text-left">
      <span
        class="inline-flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-7"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      </span>

      <p class="mt-5 text-sm font-bold uppercase tracking-widest text-blue-700">
        Espace sécurisé
      </p>

      <h1 class="mt-2 text-3xl font-bold text-blue-950">
        Heureux de vous revoir
      </h1>

      <p class="mt-3 text-gray-600">
        Connectez-vous pour accéder à vos colis suivis.
      </p>
    </div>

    <form
      class="mt-8"
      @submit.prevent="soumettreConnexion"
    >
      <div>
        <label
          for="email"
          class="block text-sm font-semibold text-gray-800"
        >
          Adresse email
        </label>

        <div class="relative mt-2">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M4 5h16v14H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>

          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="test@moncolis.fr"
            class="w-full rounded-xl border border-gray-300 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
          >
        </div>
      </div>

      <div class="mt-5">
        <label
          for="mot-de-passe"
          class="block text-sm font-semibold text-gray-800"
        >
          Mot de passe
        </label>

        <div class="relative mt-2">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
              />

              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </span>

          <input
            id="mot-de-passe"
            v-model="motDePasse"
            :type="afficherMotDePasse ? 'text' : 'password'"
            autocomplete="current-password"
            required
            placeholder="Votre mot de passe"
            class="w-full rounded-xl border border-gray-300 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
          >

          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-4 text-gray-500 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
            :aria-label="afficherMotDePasse
              ? 'Masquer le mot de passe'
              : 'Afficher le mot de passe'"
            @click="afficherMotDePasse = !afficherMotDePasse"
          >
            <svg
              v-if="!afficherMotDePasse"
              viewBox="0 0 24 24"
              class="size-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              class="size-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="m3 3 18 18" />
              <path d="M10.6 5.2A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-2 2.8" />
              <path d="M6.6 6.6C3.8 8.5 2 12 2 12s4 7 10 7a9.8 9.8 0 0 0 4.2-.9" />
            </svg>
          </button>
        </div>
      </div>

      <p
        v-if="authStore.erreur"
        class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        role="alert"
      >
        {{ authStore.erreur }}
      </p>

      <button
        type="submit"
        :disabled="authStore.pending"
        class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-blue-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
      >
        <svg
          v-if="!authStore.pending"
          viewBox="0 0 24 24"
          class="size-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>

        <span
          v-else
          class="size-5 animate-spin rounded-full border-2 border-blue-950 border-t-transparent"
          aria-hidden="true"
        />

        {{ authStore.pending
          ? 'Connexion en cours...'
          : 'Se connecter' }}
      </button>
    </form>

    <div class="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-4">
      <div class="flex items-start gap-3">
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            class="size-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 8h.01" />
          </svg>
        </span>

        <div class="text-sm text-blue-950">
          <p class="font-bold">
            Compte de démonstration
          </p>

          <p class="mt-1">
            Email :
            <strong>test@moncolis.fr</strong>
          </p>

          <p>
            Mot de passe :
            <strong>colis123</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>