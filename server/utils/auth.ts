import { createHmac } from 'node:crypto'
import type { H3Event } from 'h3'
import { getCookie } from 'h3'

const emailCompteTest = 'test@moncolis.fr'

export function creerTokenSession(event: H3Event): string {
  const config = useRuntimeConfig(event)

  return createHmac('sha256', config.sessionSecret)
    .update(emailCompteTest)
    .digest('hex')
}

export function sessionEstValide(event: H3Event): boolean {
  const token = getCookie(event, 'session_token')

  return token === creerTokenSession(event)
}