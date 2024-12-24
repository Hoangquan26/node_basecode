'use strict'
const slugify = require('slugify')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'
const { Types, Schema, model } = require('mongoose')
const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_price: { type: Number, required: true},
    product_quantity: { type: Number, required: true},
    product_description: { type: String },
    product_type: { type: Types.ObjectId, required: true, ref: "Category"},
    product_attributes: { type: Schema.Types.Mixed, required: true},
    product_shop : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_rating: {
        type: Number,
        default: 4.5,
        min: [1, 'rating must be above 1'],
        max: [5, 'rating must be above 1'],
        set: (val) => Math.round(val*10) / 10
    },
    product_slug: { type: String },
    isDraft: { type: Boolean, default: true, select: false, index: true},
    isPublic: { type: Boolean, default: false, select: false, index: true}
},
{
    timestamps: true,
    collection: COLLECTION_NAME
})

productSchema.index({'product_name': 'text', 'product_description': 'text'})
productSchema.pre("save", (next) => {
    this.product_slug = slugify.default(this.product_name, {
        lower: true,
        trim: true
    })
    return next()
})

module.exports = model(DOCUMENT_NAME, productSchema)