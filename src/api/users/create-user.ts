import { IncomingMessage, ServerResponse } from 'http'
import { userDb } from '../../db/userDb.ts'
import { IUser } from '../../db/userDb_d.ts'

export const createUser = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  req.setEncoding('utf-8').on('data', (chunk) => {
    try {
      const userData: Omit<IUser, 'id'> = JSON.parse(chunk)

      if (
        !userData.age ||
        !userData.username ||
        !Array.isArray(userData.hobbies)
      ) {
        res.statusCode = 400
        res.end('Bad input, missing required fields')
        return
      }

      const user = userDb.add(userData)

      res.writeHead(201, { 'content-type': 'application/json' })
      res.end(JSON.stringify(user))
    } catch (err: any) {
      res.statusCode = 500
      res.end(err.message)
    }
  })
}
