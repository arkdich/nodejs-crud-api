import cluster from 'node:cluster'
import { IncomingMessage } from 'node:http'
import { AddressInfo } from 'node:net'

export const logRequestInfo = (req: IncomingMessage) => {
  if (cluster.isPrimary) {
    console.log(`Request: ${req.method} ${req.url}`)
  } else {
    const address = req.socket.address() as AddressInfo
    console.log(`Request at ${address.port}: ${req.method} ${req.url}`)
  }
}
