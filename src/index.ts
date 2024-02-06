import 'dotenv/config'
import { createReadStream } from 'fs'
import { createServer, request } from 'http'

const PORT = process.env.SERVER_PORT

const server = createServer((req, res) => {
  console.log(`Incoming ${req.method} request`)

  const readStream = createReadStream('src/static/text.txt')
  readStream.pipe(res)

  res.writeHead(200, 'OK', {
    'content-type': 'plain/text',
  })

  readStream.on('end', () => {
    res.end()
  })
})

server.on('listening', () => {
  console.log(
    `Server is listening on port ${PORT}\nAccess on http://localhost:${PORT}`
  )

  const clientRequest = request({
    method: 'POST',
    protocol: 'http:',
    origin: 'localhost',
    port: PORT,
  })

  clientRequest.end()
})

server.listen(PORT)
