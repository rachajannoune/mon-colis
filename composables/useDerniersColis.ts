export function useDerniersColis() {
  const derniersColis = useState<string[]>(
    'derniers-colis-consultes',
    () => []
  )

  return {
    derniersColis
  }
}