import 'dotenv/config'
import { createServer, request } from 'http'
import { createUser } from './api/users/create-user.ts'
import { userDb } from './db/userDb.ts'
import { getUsers } from './api/users/get-users.ts'
import { getUser } from './api/users/get-user.ts'
import { handleRequest } from './lib/handle-request.ts'

const PORT = Number(process.env.SERVER_PORT)
const HOSTNAME = 'localhost'

const server = createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`)

  try {
    handleRequest(req, res)
  } catch (err: any) {
    res.writeHead(404, {
      'content-type': 'plain/text',
    })

    res.end(err.message)
  }
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)

  const clientRequest = request({
    method: 'GET',
    protocol: 'http:',
    host: 'localhost',
    path: '/api/users/42',
    port: PORT,
  }).end()

  clientRequest.on('response', (res) => {
    console.log(`\n--------\nResponse: ${res.statusCode} ${res.statusMessage}`)

    res.setEncoding('utf-8').on('data', (chunk) => {
      process.stdout.write('Body: ')
      console.log(chunk)
    })
  })
})

process.stdin.on('data', (chunk) => {
  const input = chunk.toString().trim()

  if (input === 'list') {
    process.stdout.write('users: ')
    console.dir(userDb.getAll())
  }

  if (input === 'clear') {
    console.clear()
  }
})

// curl -X POST http://localhost:3000/api/users -d '{"username":"Artemy","age":25,"hobbies":[]}'
