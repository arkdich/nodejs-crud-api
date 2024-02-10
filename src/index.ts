import 'dotenv/config'
import { createServer } from 'node:http'
import { handleRequest } from './lib/handle-request.ts'
import { MIME_TYPES } from './lib/constants.ts'
import cluster from 'node:cluster'
import { setupLoadBalancer } from './lib/setup-load-balancer.ts'
import { logRequestInfo } from './lib/debug.ts'

const PORT = Number(process.env.SERVER_PORT)
const HOSTNAME = 'localhost'
const IS_MULTI = process.env.IS_MULTI === 'true'

if (IS_MULTI && cluster.isPrimary) {
  setupLoadBalancer(PORT, HOSTNAME)
} else {
  const server = createServer((req, res) => {
    logRequestInfo(req)

    res.setHeader('Content-Type', MIME_TYPES.JSON)
    handleRequest(req, res)
  })

  server.listen(PORT, HOSTNAME, () => {
    console.log(
      `Server with pid ${process.pid} running at http://${HOSTNAME}:${PORT}`
    )
  })
}
