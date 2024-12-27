'use strict'

const { BadRequestError } = require("../core/error.response")
const inventoryModel = require("../models/inventory.model")
const { convertObjectIdMongoDB, clearUpdateNestedValue } = require("../utills")

const createInventory = async({
    userId,
    inven_productId,
    inven_stock,
    inven_location= "HN",
    inven_name
}) => {
    return await inventoryModel.create({
        inven_shopId: userId,
        inven_productId,
        inven_stock,
        inven_location,
        inven_name
    })
}

const insertInventory = async({
    userId,
    invenId,
    quantity
}) => {
    const foundInven = await inventoryModel.findOne({
        inven_shopId: convertObjectIdMongoDB(userId),
        _id: convertObjectIdMongoDB(invenId)
    })
    if(!foundInven) throw new BadRequestError('Not found inventory')
    foundInven.inven_stock += quantity
    return await foundInven.save()
}

const updateInventory = async({
    userId,
    invenId,
    payload
}) => {
    const clearPayload = clearUpdateNestedValue(payload)
    const filter = {
        inven_shopId: convertObjectIdMongoDB(userId),
        _id: convertObjectIdMongoDB(invenId)
    }
    const update = {
        ...clearPayload
    }
    const options = {
        new: true
    }

    return await inventoryModel.findOneAndUpdate(filter, update, options)
}

const inactiveInventory = async({
    invenId
}) => {
    return await inventoryModel.findByIdAndUpdate(invenId, {isActive: false}, {new: true})
}

const activeInventory = async({
    invenId
}) => {
    return await inventoryModel.findByIdAndUpdate(invenId, {isActive: true}, {new: true})
}

module.exports = {
    createInventory,
    insertInventory,
    updateInventory,
    inactiveInventory,
    activeInventory
}