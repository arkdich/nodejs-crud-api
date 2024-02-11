import { IUser, IUserDbProvider } from './userDb_d.ts'
import { ResponseError } from '../lib/constants.ts'
import { UserDb } from './userDb.ts'

export class UserDbInMemoryProvider implements IUserDbProvider {
  private static db = new UserDb()

  add(data: Omit<IUser, 'id'>): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = UserDbInMemoryProvider.db.add(data)

        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }

  get(id: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = UserDbInMemoryProvider.db.get(id)

        if (!user) {
          return reject(new ResponseError(404, `User with id ${id} not found`))
        }

        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }

  getAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      try {
        const user = UserDbInMemoryProvider.db.getAll()

        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }

  update(data: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      try {
        const user = UserDbInMemoryProvider.db.update(data)

        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }

  delete(id: string): Promise<IUser['id']> {
    return new Promise((resolve, reject) => {
      try {
        const user = UserDbInMemoryProvider.db.delete(id)

        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  }
}
