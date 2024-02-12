import { UserDbRemoteProvider } from './UserDbRemoteProvider.ts'
import { UserDbController } from './UserDbController.ts'
import { UserDbInMemoryProvider } from './UserDbInMemoryProvider.ts'
import { getSocketPath } from '../lib/setup-user-db.ts'

export const setupDbProvider = (isMulti: boolean) => {
  if (isMulti) {
    const socketPath = getSocketPath()

    const remoteProvider = new UserDbRemoteProvider(socketPath)
    new UserDbController(remoteProvider)
  } else {
    const inMemoryProvider = new UserDbInMemoryProvider()
    new UserDbController(inMemoryProvider)
  }
}
