const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const User = new Schema({

    name: {
        type: String,
        required: [true, "El nombre  es obligatorio"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: {
            values: ['ADMIN','USER'],
            message: '{VALUE} no es un rol valido'
        }
    },
    active: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false
    }

})

// HIDE PASSWORD
User.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

User.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})

module.exports = model('user', User)