import { createServer, request } from 'node:http'
import { spawnClusters } from './spawn-clusters.ts'

export const setupLoadBalancer = (port: number, hostname: string) => {
  const { clustersCount } = spawnClusters(port)

  let nextCluster = 1

  const server = createServer((req, res) => {
    const { method, url, headers } = req

    const workerRequest = request(
      {
        method,
        protocol: 'http:',
        hostname,
        path: url,
        port: port + nextCluster,
        headers,
      },
      (workerResponse) => {
        res.writeHead(
          workerResponse.statusCode ?? 200,
          workerResponse.statusMessage,
          workerResponse.headers
        )

        workerResponse.pipe(res)
      }
    )

    nextCluster = (nextCluster + 1) % clustersCount

    req.pipe(workerRequest)
  })

  server.listen(port, hostname, () => {
    console.log(`Load balancer is running at http://${hostname}:${port}`)
  })
}
