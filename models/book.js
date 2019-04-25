const mongoose = require('mongoose');

bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    pages: { type: Number, required: false },
})

const bookModel = mongoose.model('book', bookSchema)

/*

module.exports.findByTitle = function (title, callback) {
    bookModel.findOne({ title: title }, (error, bookFound) => {
        if (error) return callback(error);
        return callback(bookFound);
    })
}

module.exports.findByAuthor = function (author, callback) {
    bookModel.findOne({ author: author }, (error, bookFound) => {
        if (error) return callback(error);
        return callback(bookFound);
    })
}

*/

module.exports.getAll = function (limitNum, callback) {
    bookModel.find().sort({ title: 1 }).limit(limitNum)
        .then((booksFound) => {
            callback(booksFound)
        });
}

module.exports.getByID = function (id, callback){
    bookModel.findById(id)
    .then((bookFound) => {
        callback(bookFound)
    })
}

module.exports.delete = function (id, callback) {
    bookModel.findByIdAndDelete(id, (error, result) => {
        if (error) return callback(error);
        return callback(result);
    })
}

module.exports.creat = function (book, callback) {
    new bookModel({
        title: book.title,
        author: book.author,
        pages: book.pages
    }).save((error, result) => {
        callback(error, result);
    })
}