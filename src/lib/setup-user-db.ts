import { createServer } from 'net'
import { UserDb } from '../db/userDb.ts'
import { ResponseError } from './constants.ts'
import { unlinkSync } from 'fs'

export const setupUserDb = (path: string) => {
  const userDb = new UserDb()

  const server = createServer((socket) => {
    socket.on('data', (chunk) => {
      try {
        const data: {
          method: 'add' | 'get' | 'getAll' | 'update' | 'delete'
          body: any
        } = JSON.parse(chunk.toString())

        if (data.method === 'add') {
          const user = userDb.add(data.body)
          socket.write(JSON.stringify(user))
        }

        if (data.method === 'get') {
          const users = userDb.get(data.body.id)
          socket.write(JSON.stringify(users))
        }

        if (data.method === 'getAll') {
          const users = userDb.getAll()
          socket.write(JSON.stringify(users))
        }

        if (data.method === 'update') {
          const users = userDb.update(data.body)
          socket.write(JSON.stringify(users))
        }

        if (data.method === 'delete') {
          const id = userDb.delete(data.body.id)
          socket.write(JSON.stringify({ id }))
        }
      } catch (err) {
        if (err instanceof ResponseError) {
          socket.write(JSON.stringify({ code: err.code, message: err.message }))
        } else {
          throw err
        }
      }
    })
  })

  server.listen(path, () => {
    console.log(`IPC server running at ${path}`)
  })

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Error, ${err.message}, trying to restart`)

      unlinkSync(path)
      server.listen(path)
    } else {
      throw err
    }
  })
}
