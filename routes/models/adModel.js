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
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    services: {
        type: [{ type: Object }],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Ad', adSchema)