export interface IUser {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export interface IUserCollection {
  add(data: Omit<IUser, 'id'>): Promise<IUser>
  get(id: string): Promise<IUser | null>
  getAll(): Promise<IUser[]>
  update(data: IUser): Promise<IUser>
  delete(id: string): Promise<IUser['id']>
}
