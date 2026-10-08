import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

const readBodyMock = vi.fn()

vi.stubGlobal(
  'defineEventHandler',
  (handler: (event: unknown) => unknown) => handler
)

vi.stubGlobal('readBody', readBodyMock)

vi.stubGlobal(
  'createError',
  ({
    statusCode,
    statusMessage
  }: {
    statusCode: number
    statusMessage: string
  }) => Object.assign(
    new Error(statusMessage),
    {
      statusCode,
      statusMessage
    }
  )
)

const { default: handlerTarifs } = await import(
  '../../server/api/tarifs.post'
)

describe('POST /api/tarifs', () => {
  beforeEach(() => {
    readBodyMock.mockReset()
  })

  it('calcule le tarif d’une lettre en France', async () => {
    readBodyMock.mockResolvedValue({
      typeEnvoi: 'lettre',
      poidsG: 20,
      destination: 'france',
      avecSuivi: false
    })

    const resultat = await handlerTarifs({} as never)

    expect(resultat).toEqual({
      prix: 1.5
    })
  })

  it('refuse un poids non pris en charge', async () => {
    readBodyMock.mockResolvedValue({
      typeEnvoi: 'colis',
      poidsG: 6000,
      destination: 'france',
      avecSuivi: false
    })

    await expect(
      handlerTarifs({} as never)
    ).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'Poids non pris en charge'
    })
  })
})