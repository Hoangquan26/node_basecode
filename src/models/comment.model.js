'use strict'

const DOCUMENT_NAME = "Comment"
const COLLECTION_NAME = "Comments"

const { Types, Schema, model } = require('mongoose')

const commentSchema = new Schema({
    comment_title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})