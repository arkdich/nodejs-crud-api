import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { MIME_TYPES, ResponseError } from '../../lib/constants.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'

export const getUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const id = Number(req.url?.match(/\d+/gi)?.at(0))

    if (isNaN(id)) {
      throw new ResponseError(400, 'Bad input, incorrect user id')
    }

    const user = userDb.get(id)

    if (!user) {
      throw new ResponseError(404, 'User not found')
    }

    res.statusCode = 200
    res.end(JSON.stringify(user))
  } catch (err: any) {
    respondeWithError(res, err.code, err.message)
  }
}
