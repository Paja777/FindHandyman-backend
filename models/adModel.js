const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adSchema = new Schema({

    category: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false
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
        required: false
    },
    note: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ad', adSchema)