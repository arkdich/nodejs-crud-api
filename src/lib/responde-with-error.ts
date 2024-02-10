import { IncomingMessage, ServerResponse } from 'http'

export const respondeWithError = (
  res: ServerResponse<IncomingMessage>,
  code: number = 500,
  message: string
) => {
  res.statusCode = code
  res.end(JSON.stringify({ message }))
}
