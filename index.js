import express from 'express'
import indexMiddleware from './src/index.middleware.js'
import indexRouter from './src/index.route.js'
import indexConfig from './src/index.config.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()
const PORT = 3000 

const __fileName = fileURLToPath(import.meta.url)
const __dirName = dirname(__fileName)

const clientPath = join(__dirName, 'client')

app.use(express.static(clientPath))

app.use(indexConfig)
   .use(indexMiddleware)
   .use('/api', indexRouter)

app.get('/', (req, res) => res.send(join(clientPath, 'index.html')))

app.listen(PORT, () => console.log('Server is running on port:', PORT))