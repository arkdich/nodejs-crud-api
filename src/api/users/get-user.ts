import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { MIME_TYPES } from '../../lib/constants.ts'

export const getUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const id = Number(req.url?.match(/\d+/gi)?.at(0))

  if (isNaN(id)) {
    res.statusCode = 400
    res.end('Bad input, incorrect user id')
    return
  }

  try {
    const user = userDb.get(id)

    if (!user) {
      res.statusCode = 404
      res.end()
      return
    }

    res
      .writeHead(200, { 'content-type': MIME_TYPES.JSON })
      .end(JSON.stringify(user))
  } catch (err: any) {
    res.statusCode = 400
    res.end(err.message)
  }
}
