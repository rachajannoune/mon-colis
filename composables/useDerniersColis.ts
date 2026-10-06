const NOMBRE_MAXIMUM_COLIS = 5

export function useDerniersColis() {
  const derniersColis = useState<string[]>(
    'derniers-colis-consultes',
    () => []
  )

  function ajouterDernierColis(numero: string): void {
    const listeSansDoublon = derniersColis.value.filter(
      numeroEnregistre => numeroEnregistre !== numero
    )

    derniersColis.value = [
      numero,
      ...listeSansDoublon
    ].slice(0, NOMBRE_MAXIMUM_COLIS)
  }

  return {
    derniersColis,
    ajouterDernierColis
  }
}