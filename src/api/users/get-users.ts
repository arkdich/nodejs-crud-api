import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'

export const getUsers = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const users = userDb.getAll()

  res
    .writeHead(200, { 'content-type': 'application/json' })
    .end(JSON.stringify(users))
}
