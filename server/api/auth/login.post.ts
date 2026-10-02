import { setCookie } from 'h3'

const compteTest = {
  email: 'test@moncolis.fr',
  motDePasse: 'colis123',
  nom: 'Utilisateur test'
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string
    motDePasse?: string
  }>(event)

  const email = body.email?.trim().toLowerCase()
  const motDePasse = body.motDePasse

  if (!email || !motDePasse) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }

  if (
    email !== compteTest.email
    || motDePasse !== compteTest.motDePasse
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Identifiants incorrects'
    })
  }

  const tokenSession = 'mon-colis-session'

  setCookie(event, 'session_token', tokenSession, {
    maxAge: 60 * 60 * 2,
    sameSite: 'lax',
    path: '/'
  })

  return {
    utilisateur: {
      email: compteTest.email,
      nom: compteTest.nom
    }
  }
})