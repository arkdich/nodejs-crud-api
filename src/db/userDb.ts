import { ResponseError } from '../lib/constants.ts'
import { IUser } from './userDb_d'
import { v4 as generateId } from 'uuid'

export class UserDb {
  private users: IUser[] = []

  add(data: Omit<IUser, 'id'>) {
    const user: IUser = {
      id: generateId(),
      ...data,
    }

    this.users.push(user)

    return user
  }

  get(id: string) {
    const user = this.users.find((user) => user.id === id)

    return user ?? null
  }

  getAll() {
    return this.users
  }

  update(data: IUser) {
    const user = this.get(data.id)

    if (!user) {
      throw new ResponseError(404, `User with id ${data.id} not found`)
    }

    user.age = data.age
    user.username = data.username
    user.hobbies = data.hobbies

    return user
  }

  delete(id: string) {
    const filtered = this.users.filter((user) => user.id !== id)

    if (filtered.length === this.users.length) {
      throw new ResponseError(404, `User with id ${id} not found`)
    }

    this.users = filtered

    return id
  }
}

export const userDb = new UserDb()
