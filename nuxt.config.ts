export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],

  typescript: {
    typeCheck: true
  },

  runtimeConfig: {
    sessionSecret: '',

    public: {
      appName: 'Mon Colis La Poste',
      apiBase: '/api'
    }
  },

  routeRules: {
    '/tarifs': {
      prerender: true
    },

    '/mon-espace': {
      ssr: false
    }
  },

  experimental: {
    appManifest: false
  }
})