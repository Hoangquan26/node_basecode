const { Types, Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'KEY_TOKEN'
const COLLECTION_NAME = 'KEY_TOKENS'

const keyTokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'USER'
    },
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    refreshTokenUsed: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})



module.exports = model(DOCUMENT_NAME, keyTokenSchema)