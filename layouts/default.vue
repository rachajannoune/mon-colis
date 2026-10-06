
<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    <header class="bg-blue-900 text-white">
      <div class="mx-auto w-full max-w-7xl px-4 py-4">
        <NuxtLink
          to="/"
          class="text-xl font-bold"
        >
          Mon Colis
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-gray-600">
        Mon Colis La Poste
      </div>
    </footer>
  </div>
</template>