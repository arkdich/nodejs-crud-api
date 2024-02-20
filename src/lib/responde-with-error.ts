import { IncomingMessage, ServerResponse } from 'http'

export const respondeWithError = (
  res: ServerResponse<IncomingMessage>,
  code: number = 500,
  message: string = 'Internal Server Error'
) => {
  res.statusCode = code
  res.end(JSON.stringify({ message }))
}
