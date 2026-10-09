import type { Colis } from '../../types/shared'
import colisData from '../data/colis.json'
import { sessionEstValide } from '../utils/auth'
import { numerosColisSuivis } from '../utils/mesColis'

export default defineEventHandler((event) => {
  if (!sessionEstValide(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non autorisé'
    })
  }

  const colis = colisData as Colis[]

  return colis.filter((colisItem) =>
    numerosColisSuivis.includes(colisItem.numero)
  )
})