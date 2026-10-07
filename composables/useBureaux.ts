import type { Bureau, ServiceBureau } from '~/types/shared'
import type { ComputedRef } from 'vue'

export function useBureaux(
  codePostal: ComputedRef<string>,
  service: ComputedRef<ServiceBureau | ''>
) {
  const config = useRuntimeConfig()

  return useAsyncData<Bureau[]>(
    'recherche-bureaux',
    () => $fetch<Bureau[]>(
      `${config.public.apiBase}/bureaux`,
      {
        query: {
          codePostal: codePostal.value || undefined,
          service: service.value || undefined
        }
      }
    ),
    {
      watch: [
        codePostal,
        service
      ]
    }
  )
}