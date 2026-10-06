<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    <div class="h-1.5 bg-yellow-400" />

    <header class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-5"
      >
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
          aria-label="Mon Colis - Accueil"
        >
          <span
            class="flex size-11 items-center justify-center rounded-lg bg-blue-700 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
              <path d="M3 7.5V17l9 4 9-4V7.5" />
              <path d="M12 12v9" />
            </svg>
          </span>

          <span>
            <span class="block text-xl font-bold text-blue-900">
              Mon Colis
            </span>
            <span class="block text-xs text-gray-500">
              Suivi et services postaux
            </span>
          </span>
        </NuxtLink>

        <NuxtLink
          to="/connexion"
          class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:border-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <svg
            viewBox="0 0 24 24"
            class="size-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>

          <span class="hidden sm:inline">
            Se connecter
          </span>
        </NuxtLink>
      </div>

      <nav
        class="border-t border-gray-100 bg-white"
        aria-label="Navigation principale"
      >
        <div
          class="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4"
        >
          <NuxtLink
            to="/"
            class="whitespace-nowrap border-b-4 border-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-blue-900"
          >
            Accueil
          </NuxtLink>

          <NuxtLink
            to="/#suivi"
            class="whitespace-nowrap border-b-4 border-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-blue-900"
          >
            Suivre un colis
          </NuxtLink>

          <NuxtLink
            to="/bureaux"
            class="whitespace-nowrap border-b-4 border-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-blue-900"
          >
            Trouver un bureau
          </NuxtLink>

          <NuxtLink
            to="/tarifs"
            class="whitespace-nowrap border-b-4 border-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-blue-900"
          >
            Calculer un tarif
          </NuxtLink>

          <NuxtLink
            to="/mon-espace"
            class="whitespace-nowrap border-b-4 border-transparent px-4 py-4 text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-blue-900"
          >
            Mon espace
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <slot />
    </main>

    <footer class="mt-10 border-t border-gray-200 bg-white">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          © 2026 Mon Colis La Poste
        </p>

        <p>
          Application de démonstration Nuxt 3
        </p>
      </div>
    </footer>
  </div>
</template>