import bookModel from "../model/book.schema.js";

const bookService = {
    createService: async (payload) => {
        return await new bookModel(payload).save()
    },
    findService: async () => {
        return await bookModel.find()
    },
    findByIDService: async (id) => {
        return await bookModel.findOne({id})
    },
    updateService: async (payload) => {
        return await bookModel.updateOne({id: payload.id}, {title: payload.title, author: payload.author})
    },
    deleteService: async (id) => {
        return await bookModel.deleteOne({id})
    },
    getLatestService: async () => {
        return await bookModel.findOne().sort({ id: -1 }).exec();
    }
}

export default bookService