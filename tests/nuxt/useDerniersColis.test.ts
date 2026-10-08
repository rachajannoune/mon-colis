import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest'

describe('useDerniersColis', () => {
  beforeEach(() => {
    clearNuxtState()
  })

  it('ajoute un numéro en première position', () => {
    const {
      derniersColis,
      ajouterDernierColis
    } = useDerniersColis()

    ajouterDernierColis('LA123456789FR')

    expect(derniersColis.value).toEqual([
      'LA123456789FR'
    ])
  })

  it('évite les doublons', () => {
    const {
      derniersColis,
      ajouterDernierColis
    } = useDerniersColis()

    ajouterDernierColis('LA123456789FR')
    ajouterDernierColis('LA123456789FR')

    expect(derniersColis.value).toEqual([
      'LA123456789FR'
    ])
  })

  it('conserve au maximum cinq numéros', () => {
    const {
      derniersColis,
      ajouterDernierColis
    } = useDerniersColis()

    ajouterDernierColis('AA111111111FR')
    ajouterDernierColis('BB222222222FR')
    ajouterDernierColis('CC333333333FR')
    ajouterDernierColis('DD444444444FR')
    ajouterDernierColis('EE555555555FR')
    ajouterDernierColis('FF666666666FR')

    expect(derniersColis.value).toHaveLength(5)

    expect(derniersColis.value).toEqual([
      'FF666666666FR',
      'EE555555555FR',
      'DD444444444FR',
      'CC333333333FR',
      'BB222222222FR'
    ])
  })
})