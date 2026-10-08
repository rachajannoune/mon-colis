const formatDateFr = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

const formatDateHeureFr = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

const formatPrixFr = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
})

function convertirEnDate(valeur: string | Date): Date {
  if (valeur instanceof Date) {
    return valeur
  }

  const dateSimple = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valeur)

  if (dateSimple) {
    const [, annee, mois, jour] = dateSimple

    return new Date(
      Number(annee),
      Number(mois) - 1,
      Number(jour)
    )
  }

  return new Date(valeur)
}

export default defineNuxtPlugin(() => {
  function formatDate(valeur: string | Date): string {
    const date = convertirEnDate(valeur)

    if (Number.isNaN(date.getTime())) {
      return 'Date indisponible'
    }

    return formatDateFr.format(date)
  }

  function formatDateTime(valeur: string | Date): string {
    const date = convertirEnDate(valeur)

    if (Number.isNaN(date.getTime())) {
      return 'Date indisponible'
    }

    return formatDateHeureFr.format(date)
  }

  function formatPrice(valeur: number): string {
    if (!Number.isFinite(valeur)) {
      return 'Prix indisponible'
    }

    return formatPrixFr.format(valeur)
  }

  return {
    provide: {
      formatDate,
      formatDateTime,
      formatPrice
    }
  }
})