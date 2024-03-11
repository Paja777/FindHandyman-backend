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
        required: false
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
        required: true
    },
    note: {
        type: String,
        required: false
    },
    adRole: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Ad', adSchema)