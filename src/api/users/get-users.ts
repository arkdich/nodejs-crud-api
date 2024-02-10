import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'

export const getUsers = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = userDb.getAll()

  res.statusCode = 200
  res.end(JSON.stringify(users))
}
