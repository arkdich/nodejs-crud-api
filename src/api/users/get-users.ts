import { IncomingMessage, ServerResponse } from 'node:http'
import { UserDbController } from '../../db/UserDbController.ts'

export const getUsers = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const userDb = new UserDbController()
  const users = await userDb.getAll()

  res.statusCode = 200
  res.end(JSON.stringify(users))
}
