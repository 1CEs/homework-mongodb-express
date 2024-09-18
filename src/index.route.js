import express from 'express'
import bookRouter from './modules/books/controllers/book.route.js'

const indexRouter = express.Router()

indexRouter.use('/book', bookRouter)

export default indexRouter