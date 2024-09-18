import express from 'express'
import bookController from './book.controller.js'
import { createValidator } from 'express-joi-validation'
import { CreateBookDto } from '../dto/create-book.dto.js'
import { UpdateBookDto } from '../dto/update-book.dto.js'

const validator = createValidator()

const bookRouter = express.Router()

bookRouter.get('', bookController.getBooks)
bookRouter.get('/:id', bookController.getBookByID)
bookRouter.post('', validator.body(CreateBookDto), bookController.addBook)
bookRouter.patch('/:id', validator.body(UpdateBookDto), bookController.updateBook)
bookRouter.delete('/:id', bookController.deleteBook)

export default bookRouter
