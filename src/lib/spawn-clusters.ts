import { availableParallelism } from 'node:os'
import cluster from 'node:cluster'

export const spawnClusters = (port: number) => {
  const clustersCount = availableParallelism()

  for (let index = 1; index < clustersCount; index++) {
    cluster.fork({
      SERVER_PORT: port + index,
    })
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exited with code ${code}, signal ${signal}`
    )
  })

  return { clustersCount }
}
