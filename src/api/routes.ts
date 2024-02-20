import { createUser } from './users/create-user.ts'
import { deleteUser } from './users/delete-user.ts'
import { getUser } from './users/get-user.ts'
import { getUsers } from './users/get-users.ts'
import { updateUser } from './users/update-user.ts'

export const API_ROUTES = {
  GET: [
    { method: 'GET', path: /^\/api\/users$/i, handler: getUsers },
    { method: 'GET', path: /^\/api\/users\/.*$/i, handler: getUser },
  ],
  POST: [{ method: 'POST', path: /^\/api\/users$/i, handler: createUser }],
  PUT: [{ method: 'PUT', path: /^\/api\/users\/.*$/i, handler: updateUser }],
  DELETE: [
    { method: 'DELETE', path: /^\/api\/users\/.*$/i, handler: deleteUser },
  ],
}
