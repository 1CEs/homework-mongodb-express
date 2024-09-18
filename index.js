import express from 'express'
import indexMiddleware from './src/index.middleware.js'
import indexRouter from './src/index.route.js'
import indexConfig from './src/index.config.js'

const app = express()
const PORT = 3000 
app.use(indexConfig)
   .use(indexMiddleware)
   .use('/api', indexRouter)

app.listen(PORT, () => console.log('Server is running on port:', PORT))