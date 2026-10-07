import type {
  DemandeTarif,
  ResultatTarif
} from '~/types/shared'

export function useTarif() {
  // Récupère la configuration publique de Nuxt,
  
  const config = useRuntimeConfig()

  // Contient le prix retourné par le backend.

  const resultat = ref<ResultatTarif>()

  // Indique si le calcul est en cours.
  const pending = ref(false)

  // Contient le message d’erreur à afficher dans la page.
  const erreur = ref('')

  // Envoie les informations du formulaire au backend.
  // Promise<void> indique que la fonction est asynchrone
  // et ne retourne pas directement de valeur.
  async function calculerTarif(
    demande: DemandeTarif
  ): Promise<void> {
    // Active l’état de chargement.
    pending.value = true

    // Supprime une éventuelle erreur précédente.
    erreur.value = ''

    try {
      // Envoie une requête POST vers /api/tarifs.
      // Le backend calcule le prix et retourne un ResultatTarif.
      resultat.value = await $fetch<ResultatTarif>(
        `${config.public.apiBase}/tarifs`,
        {
          method: 'POST',

          // Transmet les valeurs du formulaire
          // dans le corps de la requête.
          body: demande
        }
      )
    }
    catch {
      // Supprime un ancien résultat si la requête échoue.
      resultat.value = undefined

      // Prépare le message qui sera affiché dans la page.
      erreur.value = 'Impossible de calculer le tarif.'
    }
    finally {
      // Désactive toujours le chargement,
      // que la requête réussisse ou échoue.
      pending.value = false
    }
  }

  // Rend les données et la fonction accessibles
  // à la future page pages/tarifs.vue.
  return {
    resultat,
    pending,
    erreur,
    calculerTarif
  }
}