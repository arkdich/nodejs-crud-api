import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { ResponseError } from '../../lib/constants.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { validate } from 'uuid'
import { remoteProvider } from '../../db/UserDbRemoteProvider.ts'

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const id = req.url?.split('/')[3]

    if (!id || !validate(id)) {
      throw new ResponseError(400, 'Bad input, invalid user id')
    }

    // const user = userDb.get(id)

    const user = await remoteProvider.get(id)

    if (!user) {
      throw new ResponseError(404, `User with id ${id} not found`)
    }

    res.statusCode = 200
    res.end(JSON.stringify(user))
  } catch (err: any) {
    respondeWithError(res, err.code, err.message)
  }
}
