<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
    <main class="w-full max-w-md">
      <NuxtLink
        to="/"
        class="mb-8 block text-center text-2xl font-bold text-blue-900"
      >
        Mon Colis
      </NuxtLink>

      <div class="rounded-xl bg-white p-6 shadow-sm">
        <slot />
      </div>
    </main>
  </div>
</template>