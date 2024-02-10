import { IncomingMessage, ServerResponse } from 'http'
import { API_ROUTES } from '../api/routes.ts'
import { ResponseError } from './constants.ts'
import { respondeWithError } from './responde-with-error.ts'

export const handleRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const { url, method } = req

    if (!method || !url) {
      throw new ResponseError(
        400,
        'Method and URL must be provided for http request'
      )
    }

    const routes = API_ROUTES[req.method as keyof typeof API_ROUTES]

    const route = routes.find((route) => route.path.test(url))

    if (!route) {
      throw new ResponseError(404, "Route doesn't exist")
    }

    route.handler(req, res)
  } catch (err: any) {
    respondeWithError(res, err.code, err.message)
  }
}
