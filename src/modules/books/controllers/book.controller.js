import bookService from "../services/book.service.js"

const bookController = {
    addBook: async (req, res) => {
        try {
            const latestBook = await bookService.getLatestService()
            const { title, author } = req.body
            const payload = {
                id: latestBook && latestBook.id ? latestBook.id + 1 : 1,
                title,
                author
            }
            const addedBook = await bookService.createService(payload)
            res.status(201).json({ data: addedBook, info: { code: 201, message: "Book has been added."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    getBooks: async (req, res) => {
        try {
            const books = await bookService.findService()
            res.status(200).json({ data: books })
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    getBookByID: async (req, res) => {
        try {
            const id = req.params.id
            const book = await bookService.findByIDService(parseInt(id))
            res.status(200).json({ data: book, info: { code: 200, message: book ? "Book found." : "Book not found."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    updateBook: async (req, res) => {
        try {
            const id = req.params.id
            const { title, author } = req.body
            const payload = {
                id: parseInt(id),
                title,
                author
            }
            const updatedBook = await bookService.updateService(payload)
            res.status(200).json({ data: updatedBook, info: { code: 200, message: "Book update successfully." }})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    },
    deleteBook: async (req, res) => {
        try {
            const id = req.params.id
            const deletedBook = await bookService.deleteService(parseInt(id))
            res.status(200).json({ data: deletedBook, info: { code: 204, message: deletedBook.deletedCount > 0 ? "Book delete successfully." : "Cannot delete book."}})
        }catch(err){
            res.status(500).json({
                code: 500,
                message: 'Internal Error: ' + err
            })
        }
    }
}

export default bookController