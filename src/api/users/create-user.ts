import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { IUser } from '../../db/userDb_d.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { ResponseError } from '../../lib/constants.ts'
import { isUserValid } from '../../lib/is-user-valid.ts'
import { remoteProvider } from '../../db/UserDbRemoteProvider.ts'

export const createUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  req.setEncoding('utf-8').on('data', async (chunk) => {
    try {
      const userData: Omit<IUser, 'id'> = JSON.parse(chunk)
      const isValid = isUserValid(userData)

      if (!isValid) {
        throw new ResponseError(
          400,
          'Bad input, missing required fields or invalid data'
        )
      }

      const user = await remoteProvider.add(userData)

      // const user = userDb.add(userData)

      res.statusCode = 201
      res.end(JSON.stringify(user))
    } catch (err: any) {
      respondeWithError(res, err.code, err.message)
    }
  })
}
