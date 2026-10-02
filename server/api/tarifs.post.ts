import type { DemandeTarif, ResultatTarif } from '~/types/shared'
import tarifsData from '../data/tarifs.json'

export default defineEventHandler(async (event) => {
  const demande = await readBody<DemandeTarif>(event)

  if (!['lettre', 'colis'].includes(demande.typeEnvoi)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Type d’envoi invalide'
    })
  }

  if (!['france', 'ue', 'monde'].includes(demande.destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Destination invalide'
    })
  }

  if (typeof demande.poidsG !== 'number' || demande.poidsG <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Poids invalide'
    })
  }

  if (typeof demande.avecSuivi !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Option de suivi invalide'
    })
  }

  const bareme = tarifsData[demande.typeEnvoi]

  const tranche = bareme.find(
    tranche => demande.poidsG <= tranche.poidsMaxG
  )

  if (!tranche) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Poids non pris en charge'
    })
  }

  const majoration = tarifsData.majorationDestination[demande.destination]

  let prix = tranche.prix * majoration

  if (demande.avecSuivi) {
    prix += tarifsData.optionSuivi
  }

  const resultat: ResultatTarif = {
    prix: Number(prix.toFixed(2))
  }

  return resultat
})