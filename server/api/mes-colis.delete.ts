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

  const index = numerosColisSuivis.indexOf(numero)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Ce colis n’est pas suivi'
    })
  }

  numerosColisSuivis.splice(index, 1)

  return {
    message: 'Colis retiré du suivi'
  }
})