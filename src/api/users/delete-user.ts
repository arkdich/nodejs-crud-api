import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { ResponseError } from '../../lib/constants.ts'
import { validate } from 'uuid'

export const deleteUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const id = req.url?.split('/')[3]

    if (!id || !validate(id)) {
      throw new ResponseError(400, 'Bad input, invalid user id')
    }

    userDb.delete(id)

    res.statusCode = 204
    res.end()
  } catch (err: any) {
    respondeWithError(res, err.code, err.message)
  }
}