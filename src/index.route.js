import express from 'express'
import bookRouter from './modules/books/controllers/book.route.js'
import userRouter from './modules/users/user.route.js'

const indexRouter = express.Router()

indexRouter.use('/book', bookRouter)
indexRouter.use('/user', userRouter)

export default indexRouter