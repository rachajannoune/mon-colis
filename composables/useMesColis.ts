import type { Colis } from '~/types/shared'

export function useMesColis() {
  // Récupère le chemin public de l’API depuis runtimeConfig.
  const config = useRuntimeConfig()

  // Indique qu’une opération d’ajout ou de suppression est en cours.
  const actionPending = ref(false)

  // Message d’erreur lié à l’ajout ou à la suppression.
  const erreurAction = ref('')

  // Charge les colis suivis avec GET /api/mes-colis.
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

  // Ajoute un numéro à la liste des colis suivis.
  async function ajouterColis(numero: string): Promise<boolean> {
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

      // Recharge la liste après l’ajout réussi.
      await refresh()

      return true
    }
    catch {
      erreurAction.value
        = 'Impossible d’ajouter ce colis à votre espace.'

      return false
    }
    finally {
      // Arrête toujours le chargement de l’action.
      actionPending.value = false
    }
  }

  // Retire un numéro de la liste des colis suivis.
  async function supprimerColis(numero: string): Promise<boolean> {
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

      // Recharge la liste après la suppression réussie.
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