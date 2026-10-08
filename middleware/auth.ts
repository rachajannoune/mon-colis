export default defineNuxtRouteMiddleware((to) => {
  const sessionToken = useCookie<string | null>('session_token')


  if (!sessionToken.value) {
    return navigateTo({
      path: '/connexion',
      query: {
        redirect: to.fullPath
      }
    })
  }
})