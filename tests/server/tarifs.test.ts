import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('POST /api/tarifs', async () => {
  await setup({
    server: true
  })

  it('calcule correctement un tarif colis', async () => {
    const resultat = await $fetch('/api/tarifs', {
      method: 'POST',
      body: {
        typeEnvoi: 'colis',
        poidsG: 500,
        destination: 'france',
        avecSuivi: true
      }
    })

    expect(resultat).toEqual({
      prix: 9
    })
  })

  it('refuse un poids non pris en charge', async () => {
    await expect(
      $fetch('/api/tarifs', {
        method: 'POST',
        body: {
          typeEnvoi: 'colis',
          poidsG: 6000,
          destination: 'france',
          avecSuivi: false
        }
      })
    ).rejects.toMatchObject({
      statusCode: 400
    })
  })
})