import { IUser } from './userDb_d'

class UserDb {
  private users: IUser[] = []
  private counter = 1

  add(data: Omit<IUser, 'id'>) {
    const user: IUser = {
      id: this.counter++,
      ...data,
    }

    this.users.push(user)

    return user
  }

  get(id: number) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    return user
  }

  getAll() {
    return this.users
  }

  update(data: IUser) {
    const user = this.get(data.id)

    if (!user) {
      throw new Error(`User with id ${data.id} not found`)
    }

    user.age = data.age
    user.username = data.username
    user.hobbies = data.hobbies

    return user
  }

  delete(id: number) {
    const filtered = this.users.filter((user) => user.id !== id)

    if (filtered.length === this.users.length) {
      throw new Error(`User with id ${id} not found`)
    }

    this.users = filtered

    return id
  }
}

export const userDb = new UserDb()
