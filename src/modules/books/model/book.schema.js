import mongoose from "../../../common/database/mongoose.db.js";

const { Schema, model } = mongoose

const bookSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        index: true 
    },
    title: {
        type: String,
        required: true
    }, 
    author: {
        type: String,
        default: "Annonymous"
    }
}, { timestamps: true })

const bookModel = model("book", bookSchema)

export default bookModel