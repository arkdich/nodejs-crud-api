import path from 'node:path'
import { UserDbRemoteProvider } from './UserDbRemoteProvider.ts'
import { UserDbController } from './UserDbController.ts'
import { UserDbInMemoryProvider } from './UserDbInMemoryProvider.ts'

export const setupDbProvider = (isMulti: boolean) => {
  if (isMulti) {
    const USER_DB_PATH = String(process.env.USER_DB_SOCKET)
    const socketPath = path.resolve(USER_DB_PATH)

    const remoteProvider = new UserDbRemoteProvider(socketPath)
    new UserDbController(remoteProvider)
  } else {
    const inMemoryProvider = new UserDbInMemoryProvider()
    new UserDbController(inMemoryProvider)
  }
}
