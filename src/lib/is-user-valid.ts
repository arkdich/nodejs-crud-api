import { validate } from 'uuid'
import { IUser } from '../db/userDb_d'

type Args = Omit<IUser, 'id'> & {
  id?: string
}

export const isUserValid = (data: Args) => {
  const isHobbiesFieldValid =
    Array.isArray(data.hobbies) &&
    data.hobbies.every((hobbie) => typeof hobbie === 'string')

  const isUserFieldsValid =
    typeof data.age === 'number' && typeof data.username === 'string'

  if (data.id) {
    const isIdValid = validate(data.id)

    return isIdValid && isHobbiesFieldValid && isUserFieldsValid
  }

  return isHobbiesFieldValid && isUserFieldsValid
}
