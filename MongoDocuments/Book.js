const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Int,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    
})

const Book = mongoose.model('Book',BookSchema)

module.exports = Book