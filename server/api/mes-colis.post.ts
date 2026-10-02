import type { Colis } from '~/types/shared'
import { getCookie } from 'h3'
import colisData from '../data/colis.json'
import { numerosColisSuivis } from '../utils/mesColis'

export default defineEventHandler(async (event) => {
  const tokenSession = getCookie(event, 'session_token')

  if (tokenSession !== 'mon-colis-session') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non authentifié'
    })
  }

  const body = await readBody<{ numero?: string }>(event)
  const numero = body.numero?.trim().toUpperCase()

  if (!numero) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Numéro de colis requis'
    })
  }

  const colis = (colisData as Colis[]).find(
    colis => colis.numero === numero
  )

  if (!colis) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Colis introuvable'
    })
  }

  if (numerosColisSuivis.includes(numero)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Colis déjà suivi'
    })
  }

  numerosColisSuivis.push(numero)

  return colis
})