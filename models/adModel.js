const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adSchema = new Schema({

    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    services: {
        type: [{ type: Object }],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ad', adSchema)