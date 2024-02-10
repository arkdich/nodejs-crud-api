import { IncomingMessage, ServerResponse } from 'http'
import { API_ROUTES } from '../api/routes.ts'

export const handleRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  if (!req.method || !req.url) {
    throw new Error('Method and URL must be provided for http request')
  }

  const routes = API_ROUTES[req.method as keyof typeof API_ROUTES]

  const route = routes.find((route) => {
    if (!req.url) return false

    return route.path.test(req.url)
  })

  if (!route?.handler) {
    throw new Error("Route doesn't exist")
  }

  route.handler(req, res)
}
