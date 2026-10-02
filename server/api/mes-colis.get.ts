import type { Colis } from '~/types/shared'
import { getCookie } from 'h3'
import colisData from '../data/colis.json'
import { numerosColisSuivis } from '../utils/mesColis'

export default defineEventHandler((event) => {
  const tokenSession = getCookie(event, 'session_token')

  if (tokenSession !== 'mon-colis-session') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non authentifié'
    })
  }

  const colis = colisData as Colis[]

  const colisSuivis = colis.filter(
    colis => numerosColisSuivis.includes(colis.numero)
  )

  return colisSuivis
})