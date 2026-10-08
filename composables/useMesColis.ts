import type { Colis } from '~/types/shared'

export function useMesColis() {
  const config = useRuntimeConfig()

  const actionPending = ref(false)
  const erreurAction = ref('')

  const {
    data: colisSuivis,
    pending,
    error,
    refresh
  } = useAsyncData<Colis[]>(
    'mes-colis',
    () => $fetch<Colis[]>(
      `${config.public.apiBase}/mes-colis`
    ),
    {
      default: () => []
    }
  )

  async function ajouterColis(
    numero: string
  ): Promise<boolean> {
    actionPending.value = true
    erreurAction.value = ''

    try {
      await $fetch(
        `${config.public.apiBase}/mes-colis`,
        {
          method: 'POST',
          body: {
            numero
          }
        }
      )

      await refresh()

      return true
    }
    catch {
      erreurAction.value
        = 'Impossible d’ajouter ce colis à votre espace.'

      return false
    }
    finally {
      actionPending.value = false
    }
  }

  async function supprimerColis(
    numero: string
  ): Promise<boolean> {
    actionPending.value = true
    erreurAction.value = ''

    try {
      await $fetch(
        `${config.public.apiBase}/mes-colis`,
        {
          method: 'DELETE',
          body: {
            numero
          }
        }
      )

      await refresh()

      return true
    }
    catch {
      erreurAction.value
        = 'Impossible de retirer ce colis de votre espace.'

      return false
    }
    finally {
      actionPending.value = false
    }
  }

  return {
    colisSuivis,
    pending,
    error,
    actionPending,
    erreurAction,
    ajouterColis,
    supprimerColis,
    refresh
  }
}