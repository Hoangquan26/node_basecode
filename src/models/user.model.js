const { Types, Schema, model } = require('mongoose')
const REGEX = require('../helpers/regex')
const DOCUMENT_NAME = 'USER'
const COLLECTION_NAME = 'USERS'

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: [50, 'Username must be less than 50 character'],
        default: 'USER_TEST'
    },
    email: {
        type: String,
        unique: [true, 'Email was be registered'], 
        trim: true,
        required: true,
        validate: {
            validator: (v) => {
                return REGEX.EMAIL.test(v)
            },
            message: 'Email is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password can\'t be blank']
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})



module.exports = model(DOCUMENT_NAME, userSchema)