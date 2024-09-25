import express from 'express'
import cors from 'cors'
import requestMiddleware from './middleware/request.middleware.js'

const indexMiddleware = express()
indexMiddleware.use(express.urlencoded({extended: true}))
               .use(express.json())
               .use(cors())
               .use(requestMiddleware)

export default indexMiddleware