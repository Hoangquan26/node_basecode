'use strict'

const inventoryModel = require("../models/inventory.model")

const createInventory = async({
    userId,
    inven_productId,
    inven_stock,
    inven_location= "HN"
}) => {
    return await inventoryModel.create({
        inven_shopId: userId,
        inven_productId,
        inven_stock,
        inven_location
    })
}

module.exports = {
    createInventory
}