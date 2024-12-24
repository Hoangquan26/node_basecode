'use strict'
const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'Categories'
const { Schema, Types, model } = require('mongoose')

const categorySchema = new Schema({
    cate_name: { type: String,required: true, trim: true, },
    cate_thumb: { type: String, required: true },
    cate_description: { type: String,  default: '', maxlength: 500},
    is_active: { type: Boolean, default: true  },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

moudle.exports = model(DOCUMENT_NAME, categorySchema)