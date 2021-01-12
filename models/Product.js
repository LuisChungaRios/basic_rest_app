const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    price_unit: {
        type: Number,
        required: [true, 'El precio unitario es requerido']
    },
    description: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})


module.exports = mongoose.model('Product', Product)