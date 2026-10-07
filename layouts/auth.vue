<template>
  <div class="min-h-screen bg-gray-50 lg:grid lg:grid-cols-2">
    <!-- Partie visuelle affichée sur les grands écrans -->
    <section
      class="relative hidden overflow-hidden bg-blue-950 p-12 text-white lg:flex lg:flex-col lg:justify-between"
    >
      <!-- Décorations d’arrière-plan -->
      <div
        class="absolute -left-24 -top-24 size-80 rounded-full bg-blue-700/40 blur-3xl"
        aria-hidden="true"
      />

      <div
        class="absolute -bottom-32 -right-24 size-96 rounded-full bg-yellow-400/20 blur-3xl"
        aria-hidden="true"
      />

      <!-- Logo -->
      <NuxtLink
        to="/"
        class="relative z-10 flex w-fit items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Mon Colis, retour à l’accueil"
      >
        <span
          class="flex size-12 items-center justify-center rounded-xl bg-yellow-400 text-blue-950"
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
          <span class="block text-xl font-bold">
            Mon Colis
          </span>

          <span class="block text-xs text-blue-200">
            Suivi et services postaux
          </span>
        </span>
      </NuxtLink>

      <!-- Présentation de l’espace personnel -->
      <div class="relative z-10 max-w-lg">
        <p class="text-sm font-bold uppercase tracking-widest text-yellow-400">
          Votre espace personnel
        </p>

        <h1 class="mt-4 text-4xl font-bold leading-tight xl:text-5xl">
          Retrouvez facilement tous vos colis suivis.
        </h1>

        <p class="mt-6 max-w-md text-lg leading-8 text-blue-100">
          Connectez-vous pour consulter vos envois, ajouter de nouveaux colis
          et suivre leur progression depuis un seul espace.
        </p>

        <ul class="mt-10 space-y-5">
          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-yellow-400"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span class="font-medium">
              Centralisez vos colis suivis
            </span>
          </li>

          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-yellow-400"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span class="font-medium">
              Consultez leur statut en quelques secondes
            </span>
          </li>

          <li class="flex items-center gap-4">
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-yellow-400"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span class="font-medium">
              Gérez facilement votre sélection
            </span>
          </li>
        </ul>
      </div>

      <!-- Parcours animé du véhicule -->
      <div
        class="delivery-track pointer-events-none absolute bottom-28 left-12 right-12"
        aria-hidden="true"
      >
        <!-- Point de départ -->
        <span
          class="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-yellow-400"
        />

        <!-- Route pointillée -->
        <span
          class="absolute left-5 right-20 top-1/2 border-t-2 border-dashed border-blue-400/50"
        />

        <!-- Véhicule animé -->
        <div class="delivery-vehicle">
          <div class="relative">
            <!-- Colis agrandi et animé -->
            <span
              class="delivery-package absolute -top-14 left-5 text-yellow-400"
            >
              <svg
                viewBox="0 0 24 24"
                class="size-12 drop-shadow-lg"
                fill="#facc15"
                stroke="#172554"
                stroke-width="1.5"
              >
                <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                <path d="M3 7.5V17l9 4 9-4V7.5" />
                <path d="M12 12v9" />
                <path d="m7.5 5.25 9 4.5" />
              </svg>
            </span>

            <!-- Véhicule de livraison -->
            <svg
              viewBox="0 0 64 32"
              class="h-12 w-24 text-yellow-400 drop-shadow-md"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M4 7h33v18H4Z" />
              <path d="M37 13h11l8 8v4H37Z" />
              <path d="M48 14v7h7" />

              <circle
                cx="15"
                cy="26"
                r="4"
                fill="#172554"
              />

              <circle
                cx="47"
                cy="26"
                r="4"
                fill="#172554"
              />
            </svg>
          </div>
        </div>
      </div>

      <p class="relative z-10 text-sm text-blue-300"/>
    </section>

    <!-- Partie contenant le formulaire -->
    <main
      class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10"
    >
      <div class="w-full max-w-md">
        <!-- Logo affiché sur mobile -->
        <NuxtLink
          to="/"
          class="mb-10 flex items-center justify-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 lg:hidden"
          aria-label="Mon Colis, retour à l’accueil"
        >
          <span
            class="flex size-11 items-center justify-center rounded-xl bg-blue-900 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              class="size-6"
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

          <span class="text-xl font-bold text-blue-900">
            Mon Colis
          </span>
        </NuxtLink>

        <!-- Carte contenant la page de connexion -->
        <div
          class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-blue-950/5 transition duration-300 hover:shadow-2xl"
        >
          <div class="h-2 bg-yellow-400" />

          <div class="p-7 sm:p-9">
            <slot />
          </div>
        </div>

        <p class="mt-6 text-center text-sm text-gray-500">
          Retourner à

          <NuxtLink
            to="/"
            class="font-semibold text-blue-700 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            la page d’accueil
          </NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.delivery-track {
  height: 4rem;
}

.delivery-vehicle {
  position: absolute;
  top: 50%;
  left: 0;
  animation: delivery-move 8s ease-in-out infinite;
}

.delivery-package {
  transform-origin: center bottom;
  animation: package-float 1.4s ease-in-out infinite;
}

@keyframes delivery-move {
  0% {
    left: 0;
    transform: translateY(-50%);
  }

  45% {
    left: calc(100% - 6rem);
    transform: translateY(-50%);
  }

  50% {
    left: calc(100% - 6rem);
    transform: translateY(-50%) scaleX(-1);
  }

  95% {
    left: 0;
    transform: translateY(-50%) scaleX(-1);
  }

  100% {
    left: 0;
    transform: translateY(-50%);
  }
}

@keyframes package-float {
  0%,
  100% {
    transform: translateY(0) rotate(-3deg);
  }

  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

/* Désactive les animations selon les préférences d’accessibilité. */
@media (prefers-reduced-motion: reduce) {
  .delivery-vehicle {
    left: calc(50% - 3rem);
    animation: none;
  }

  .delivery-package {
    animation: none;
  }
}
</style>