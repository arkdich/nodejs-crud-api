import 'dotenv/config'
import { createServer } from 'node:http'
import cluster from 'node:cluster'
import path from 'node:path'
import { handleRequest } from './lib/handle-request.ts'
import { MIME_TYPES } from './lib/constants.ts'
import { setupLoadBalancer } from './lib/setup-load-balancer.ts'
import { logOnListen, logRequestInfo } from './lib/debug.ts'
import { setupUserDb } from './lib/setup-user-db.ts'
import { setupDbProvider } from './db/setup-db-provider.ts'

const HOSTNAME = 'localhost'
const PORT = Number(process.env.SERVER_PORT)
const IS_MULTI = process.env.IS_MULTI === 'true'
const USER_DB_PATH = String(process.env.USER_DB_SOCKET)

if (IS_MULTI && cluster.isPrimary) {
  setupLoadBalancer(PORT, HOSTNAME)

  const socketPath = path.resolve(USER_DB_PATH)
  setupUserDb(socketPath)
} else {
  const server = createServer((req, res) => {
    logRequestInfo(req)

    res.setHeader('Content-Type', MIME_TYPES.JSON)
    handleRequest(req, res)
  })

  server.listen(PORT, HOSTNAME, () => {
    logOnListen(HOSTNAME, PORT)
  })
}

setupDbProvider(IS_MULTI)
