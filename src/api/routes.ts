import { createUser } from './users/create-user.ts'
import { getUser } from './users/get-user.ts'
import { getUsers } from './users/get-users.ts'

export const API_ROUTES = {
  GET: [
    { method: 'GET', path: /^\/api\/users$/i, handler: getUsers },
    { method: 'GET', path: /^\/api\/users\/.*$/i, handler: getUser },
  ],
  POST: [{ method: 'POST', path: /^\/api\/users$/i, handler: createUser }],
  PUT: [],
  DELETE: [],
}
