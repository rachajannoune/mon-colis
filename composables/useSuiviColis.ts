import type { Colis } from '~/types/shared'

export function useSuiviColis(numero: string) {
  const config = useRuntimeConfig()

  return useAsyncData<Colis>(
    `suivi-colis-${numero}`,
    () => $fetch<Colis>(
      `${config.public.apiBase}/colis/${encodeURIComponent(numero)}`
    )
  )
}