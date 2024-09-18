import express from 'express'
import cors from 'cors'

const indexMiddleware = express()
indexMiddleware.use(express.urlencoded({extended: true}))
               .use(express.json())
               .use(cors())

export default indexMiddleware