import { IncomingMessage, ServerResponse } from 'http'
import { ResponseError } from '../../lib/constants.ts'
import { isUserValid } from '../../lib/is-user-valid.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { IUser } from '../../db/userDb_d.ts'
import { remoteProvider } from '../../db/UserDbRemoteProvider.ts'

export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  req.setEncoding('utf-8').on('data', async (chunk) => {
    try {
      const id = req.url?.split('/')[3]
      const userData: Omit<IUser, 'id'> = JSON.parse(chunk)

      if (!id) {
        throw new ResponseError(400, 'Bad input, missing user id')
      }

      const updatedData = { ...userData, id }
      const isValid = isUserValid(updatedData)

      if (!isValid) {
        throw new ResponseError(400, 'Bad input, invalid data or user id')
      }

      const user = await remoteProvider.update(updatedData)
      // const user = userDb.update(updatedData)

      res.statusCode = 200
      res.end(JSON.stringify(user))
    } catch (err: any) {
      respondeWithError(res, err.code, err.message)
    }
  })
}
