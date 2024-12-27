'use strict'

const inventoryModel = require("../models/inventory.model")

const createInventory = async({
    inven_shopId,
    inven_productId,
    inven_stock,
    inven_location= "HN"
}) => {
    return await inventoryModel.create({
        inven_shopId,
        inven_productId,
        inven_stock,
        inven_location
    })
}

module.exports = {
    createInventory
}