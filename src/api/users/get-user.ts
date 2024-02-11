import { IncomingMessage, ServerResponse } from 'node:http'
import { ResponseError } from '../../lib/constants.ts'
import { respondeWithError } from '../../lib/responde-with-error.ts'
import { validate } from 'uuid'
import { UserDbController } from '../../db/UserDbController.ts'

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const id = req.url?.split('/')[3]

    if (!id || !validate(id)) {
      throw new ResponseError(400, 'Bad input, invalid user id')
    }

    const userDb = new UserDbController()
    const user = await userDb.get(id)

    if (!user) {
      throw new ResponseError(404, `User with id ${id} not found`)
    }

    res.statusCode = 200
    res.end(JSON.stringify(user))
  } catch (err: any) {
    respondeWithError(res, err.code, err.message)
  }
}
