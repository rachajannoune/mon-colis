import type { Bureau, ServiceBureau } from '~/types/shared'
import bureauxData from '../data/bureaux.json'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const codePostal = query.codePostal?.toString()
  const service = query.service?.toString() as ServiceBureau | undefined

  const bureaux = bureauxData as Bureau[]

  return bureaux.filter((bureau) => {
    const correspondCodePostal
      = !codePostal || bureau.codePostal === codePostal

    const correspondService
      = !service || bureau.services.includes(service)

    return correspondCodePostal && correspondService
  })
})