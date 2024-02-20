import { IUser, IUserDbProvider } from './userDb_d'

export class UserDbController implements IUserDbProvider {
  private static provider: IUserDbProvider | null = null

  constructor(provider?: IUserDbProvider) {
    if (!UserDbController.provider && provider) {
      UserDbController.provider = provider
    }
  }

  add(data: Omit<IUser, 'id'>): Promise<IUser> {
    if (!UserDbController.provider) {
      throw new Error('Database provider is not defined')
    }

    return UserDbController.provider.add(data)
  }

  get(id: string): Promise<IUser | null> {
    if (!UserDbController.provider) {
      throw new Error('Database provider is not defined')
    }

    return UserDbController.provider.get(id)
  }

  getAll(): Promise<IUser[]> {
    if (!UserDbController.provider) {
      throw new Error('Database provider is not defined')
    }

    return UserDbController.provider.getAll()
  }

  update(data: IUser): Promise<IUser> {
    if (!UserDbController.provider) {
      throw new Error('Database provider is not defined')
    }

    return UserDbController.provider.update(data)
  }

  delete(id: string): Promise<string> {
    if (!UserDbController.provider) {
      throw new Error('Database provider is not defined')
    }

    return UserDbController.provider.delete(id)
  }
}
