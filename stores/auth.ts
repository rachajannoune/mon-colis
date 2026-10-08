interface UtilisateurConnecte {
  email: string
  nom: string
}

interface ReponseConnexion {
  utilisateur: UtilisateurConnecte
}

export const useAuthStore = defineStore('auth', () => {
  const utilisateur = ref<UtilisateurConnecte | null>(null)
  const sessionToken = useCookie<string | null>('session_token')

  const estConnecte = computed(() =>
    Boolean(sessionToken.value)
  )

  const pending = ref(false)

  const erreur = ref('')

  async function connecter(
    email: string,
    motDePasse: string
  ): Promise<boolean> {
    pending.value = true
    erreur.value = ''

    try {
      const reponse = await $fetch<ReponseConnexion>(
        '/api/auth/login',
        {
          method: 'POST',
          body: {
            email,
            motDePasse
          }
        }
      )

      utilisateur.value = reponse.utilisateur
      refreshCookie('session_token')
      return true
    }
    catch {
      utilisateur.value = null
      erreur.value = 'Email ou mot de passe incorrect.'

      return false
    }
    finally {
      pending.value = false
    }
  }

  return {
    utilisateur,
    estConnecte,
    pending,
    erreur,
    connecter
  }
})