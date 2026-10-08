import type {
  DemandeTarif,
  ResultatTarif
} from '~/types/shared'

export function useTarif() {
  const config = useRuntimeConfig()

  const resultat = ref<ResultatTarif>()
  const pending = ref(false)
  const erreur = ref('')

  async function calculerTarif(
    demande: DemandeTarif
  ): Promise<void> {
    pending.value = true
    erreur.value = ''

    try {
      resultat.value = await $fetch<ResultatTarif>(
        `${config.public.apiBase}/tarifs`,
        {
          method: 'POST',
          body: demande
        }
      )
    }
    catch {
      resultat.value = undefined
      erreur.value = 'Impossible de calculer le tarif.'
    }
    finally {
      pending.value = false
    }
  }

  return {
    resultat,
    pending,
    erreur,
    calculerTarif
  }
}