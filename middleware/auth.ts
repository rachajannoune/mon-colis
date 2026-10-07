export default defineNuxtRouteMiddleware((to) => {
  // Lit le cookie créé par le backend après la connexion.
  const sessionToken = useCookie<string | null>('session_token')

  // Si aucun cookie de session n’existe,
  // redirige l’utilisateur vers la connexion.
  if (!sessionToken.value) {
    return navigateTo({
      path: '/connexion',
      query: {
        redirect: to.fullPath
      }
    })
  }
})