import { Socket, createConnection } from 'node:net'
import path from 'node:path'
import { IUser, IUserDbProvider } from './userDb_d.ts'
import { ResponseError } from '../lib/constants.ts'

export class UserDbRemoteProvider implements IUserDbProvider {
  private static connection: Socket | null = null

  constructor(path: string) {
    if (UserDbRemoteProvider.connection) return

    let retryCount = 0

    const connect = () => {
      setTimeout(() => {
        const client = createConnection(path, () => {
          console.log('Connection to user db created')
        })

        client.on('error', (err: any) => {
          if (err.code === 'ECONNREFUSED') {
            retryCount++
            if (retryCount === 3) return
            connect()
          } else {
            throw err
          }
        })

        UserDbRemoteProvider.connection = client
      }, 1000)
    }

    connect()
  }

  add(data: Omit<IUser, 'id'>): Promise<IUser> {
    return new Promise((resolve, reject) => {
      if (!UserDbRemoteProvider.connection) {
        throw new Error('Connection to db is missing')
      }

      UserDbRemoteProvider.connection.write(
        JSON.stringify({
          method: 'add',
          body: data,
        })
      )

      UserDbRemoteProvider.connection.on('data', (chunk) => {
        const response = JSON.parse(chunk.toString())

        if (response?.code && response?.message) {
          return reject(new ResponseError(response.code, response.message))
        }

        resolve(response)
      })

      UserDbRemoteProvider.connection.on('error', (err) => {
        reject(err.message)
      })
    })
  }

  get(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      if (!UserDbRemoteProvider.connection) {
        throw new Error('Connection to db is missing')
      }

      UserDbRemoteProvider.connection.write(
        JSON.stringify({
          method: 'get',
          body: {
            id,
          },
        })
      )

      UserDbRemoteProvider.connection.on('data', (chunk) => {
        const response = JSON.parse(chunk.toString())

        if (response?.code && response?.message) {
          return reject(new ResponseError(response.code, response.message))
        }

        resolve(response)
      })

      UserDbRemoteProvider.connection.on('error', (err) => {
        reject(err.message)
      })
    })
  }

  getAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      if (!UserDbRemoteProvider.connection) {
        throw new Error('Connection to db is missing')
      }

      UserDbRemoteProvider.connection.write(
        JSON.stringify({
          method: 'getAll',
        })
      )

      UserDbRemoteProvider.connection.on('data', (chunk) => {
        const response = JSON.parse(chunk.toString())

        if (response?.code && response?.message) {
          return reject(new ResponseError(response.code, response.message))
        }

        resolve(response)
      })

      UserDbRemoteProvider.connection.on('error', (err) => {
        reject(err.message)
      })
    })
  }

  update(data: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      if (!UserDbRemoteProvider.connection) {
        throw new Error('Connection to db is missing')
      }

      UserDbRemoteProvider.connection.write(
        JSON.stringify({
          method: 'update',
          body: { ...data },
        })
      )

      UserDbRemoteProvider.connection.on('data', (chunk) => {
        const response = JSON.parse(chunk.toString())

        if (response?.code && response?.message) {
          return reject(new ResponseError(response.code, response.message))
        }

        resolve(response)
      })

      UserDbRemoteProvider.connection.on('error', (err) => {
        reject(err.message)
      })
    })
  }

  delete(id: string): Promise<IUser['id']> {
    return new Promise((resolve, reject) => {
      if (!UserDbRemoteProvider.connection) {
        throw new Error('Connection to db is missing')
      }

      UserDbRemoteProvider.connection.write(
        JSON.stringify({
          method: 'delete',
          body: { id },
        })
      )

      UserDbRemoteProvider.connection.on('data', (chunk) => {
        const response = JSON.parse(chunk.toString())

        if (response?.code && response?.message) {
          return reject(new ResponseError(response.code, response.message))
        }

        resolve(response)
      })

      UserDbRemoteProvider.connection.on('error', (err) => {
        reject(err.message)
      })
    })
  }
}
