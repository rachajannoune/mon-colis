import type { Colis } from '~/types/shared'
import colisData from '../../data/colis.json'

export default defineEventHandler((event) => {
  const numero = getRouterParam(event, 'numero')?.toUpperCase()

  const formatNumero = /^[A-Z]{2}\d{9}[A-Z]{2}$/

  if (!numero || !formatNumero.test(numero)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Numéro de suivi invalide'
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

  return colis
})