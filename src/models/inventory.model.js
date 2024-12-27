'use strict'

const {model, Types, Schema} = require('mongoose')

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'

const inventoryModel = new Schema({
    inven_shopId: {type: Types.ObjectId, required: true, ref: 'User'}, //shop is user roles admin
    inven_productId: {type: Types.ObjectId, required: true, ref: 'Product'},
    inven_stock: {type: Number, required: true},
    inven_location: {type: String, default: 'Unknown'},
    inven_name: {type: String, required: true},
    isActive: {type: Boolean, default: true}
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, inventoryModel)