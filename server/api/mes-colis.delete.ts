import { getCookie } from 'h3'
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

  const index = numerosColisSuivis.indexOf(numero)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Colis non suivi'
    })
  }

  numerosColisSuivis.splice(index, 1)

  return {
    message: 'Colis retiré du suivi'
  }
})