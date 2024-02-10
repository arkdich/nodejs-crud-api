import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { IUser } from '../../db/userDb_d.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { ResponseError } from '../../lib/constants.ts'

export const createUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  req.setEncoding('utf-8').on('data', (chunk) => {
    try {
      const userData: Omit<IUser, 'id'> = JSON.parse(chunk)

      const isHobbiesFieldValid =
        Array.isArray(userData.hobbies) &&
        userData.hobbies.every((hobbie) => typeof hobbie === 'string')

      if (
        typeof userData.age !== 'number' ||
        typeof userData.username !== 'string' ||
        !isHobbiesFieldValid
      ) {
        throw new ResponseError(
          400,
          'Bad input, missing required fields or wrong data'
        )
      }

      const user = userDb.add(userData)

      res.statusCode = 201
      res.end(JSON.stringify(user))
    } catch (err: any) {
      respondeWithError(res, err.code, err.message)
    }
  })
}
