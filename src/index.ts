import 'dotenv/config'
import { createServer, request } from 'http'
import { createUser } from './api/users/create-user.ts'
import { userDb } from './db/userDb.ts'

const PORT = process.env.SERVER_PORT

const server = createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`)

  if (req.method === 'POST' && req.url === '/api/users') {
    createUser(req, res)
  } else {
    res.writeHead(404, 'Not found', {
      'content-type': 'plain/text',
    })

    res.end()
  }
})

server.on('listening', () => {
  console.log(`Server running on http://localhost:${PORT}`)

  const clientRequest = request({
    method: 'POST',
    protocol: 'http:',
    host: 'localhost',
    path: '/api/users',
    port: PORT,
  }).end(JSON.stringify({ username: 'Artemy', age: 25, hobbies: [] }))

  clientRequest.on('response', (res) => {
    console.log(`Response: ${res.statusCode} ${res.statusMessage}`)

    res.setEncoding('utf-8').on('data', (chunk) => {
      console.log(`Chunk: ${chunk}`)
    })
  })
})

process.stdin.on('data', (chunk) => {
  const input = chunk.toString().trim()

  if (input === 'list') {
    process.stdout.write('users: ')
    console.dir(userDb.getAll())
  }
})

server.listen(PORT)

// curl -X POST http://localhost:3000/api/users -d '{"username":"Artemy","age":25,"hobbies":[]}'
