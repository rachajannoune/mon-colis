import type { Colis } from '../../types/shared'
import colisData from '../data/colis.json'
import { sessionEstValide } from '../utils/auth'
import { numerosColisSuivis } from '../utils/mesColis'

export default defineEventHandler(async (event) => {
  if (!sessionEstValide(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non autorisé'
    })
  }

  const body = await readBody<{
    numero?: string
  }>(event)

  const numero = body.numero?.trim().toUpperCase()

  if (!numero) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Numéro de colis requis'
    })
  }

  const colis = colisData as Colis[]

  const colisTrouve = colis.find(
    (colisItem) => colisItem.numero === numero
  )

  if (!colisTrouve) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Colis introuvable'
    })
  }

  if (numerosColisSuivis.includes(numero)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ce colis est déjà suivi'
    })
  }

  numerosColisSuivis.push(numero)

  return colisTrouve
})