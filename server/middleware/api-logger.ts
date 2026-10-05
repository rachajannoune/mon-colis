export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/')) {
    return
  }

  const debut = Date.now()

  event.node.res.on('finish', () => {
    const duree = Date.now() - debut

    console.log(`[API] ${event.method} ${event.path} - ${duree}ms`)
  })
})