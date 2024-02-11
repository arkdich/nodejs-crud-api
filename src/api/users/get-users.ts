import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { remoteProvider } from '../../db/UserDbRemoteProvider.ts'

export const getUsers = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  // const users = userDb.getAll()

  const users = await remoteProvider.getAll()

  res.statusCode = 200
  res.end(JSON.stringify(users))
}
