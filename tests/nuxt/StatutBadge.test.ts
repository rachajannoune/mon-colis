import {
  describe,
  expect,
  it
} from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import StatutBadge from '~/components/StatutBadge.vue'

describe('StatutBadge', () => {
  it('affiche Livré pour le statut livre', async () => {
    const composant = await mountSuspended(
      StatutBadge,
      {
        props: {
          statut: 'livre'
        }
      }
    )

    expect(composant.text()).toContain('Livré')
  })

  it('affiche En transit pour le statut en_transit', async () => {
    const composant = await mountSuspended(
      StatutBadge,
      {
        props: {
          statut: 'en_transit'
        }
      }
    )

    expect(composant.text()).toContain('En transit')
  })

  it('utilise la couleur verte pour un colis livré', async () => {
    const composant = await mountSuspended(
      StatutBadge,
      {
        props: {
          statut: 'livre'
        }
      }
    )

    expect(composant.classes()).toContain('bg-green-100')
    expect(composant.classes()).toContain('text-green-800')
  })
})