import 'dotenv/config'
import { createServer, request } from 'http'
import { userDb } from './db/userDb.ts'
import { handleRequest } from './lib/handle-request.ts'
import { MIME_TYPES } from './lib/constants.ts'

const PORT = Number(process.env.SERVER_PORT)
const HOSTNAME = 'localhost'

const server = createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`)

  res.setHeader('Content-Type', MIME_TYPES.JSON)

  handleRequest(req, res)
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
