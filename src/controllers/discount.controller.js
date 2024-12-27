'use strict'

const { CREATED, OK } = require("../core/success.response")
const DiscountService = require("../services/discount.service")

class DiscountController {
    static insertDiscount = async(req, res, next) => {
        const { userId } = req.user
        new CREATED({
            message: "Insert discount successful",
            metadata: DiscountService.insertDiscount({
                userId ,
                ...req.body
            })
        }).send()
    }
    static updateDiscount = async(req, res, next) => {
        const { userId } = req.user
        new OK({
            message: "Update discount successful",
            metadata: DiscountService.updateDiscount({
                ...req.body,
                userId
            })
        }).send()
    }
    static findAllProductAvailable = async(req, res, next) => {
        new OK({
            message: "Find all products avaliable successful",
            metadata: DiscountService.findAllProductAvailable({
                ...req.body
            })
        }).send()
    }
    static getAllDiscountCodesByShop = async(req, res, next) => {
        const { userId } = req.user
        new OK({
            message: "Get all discount code successful",
            metadata: DiscountService.getAllDiscountCodesByShop({
                ...req.body,
                userId 
            })
        }).send()
    }

    static getAllDiscountCodesByUser = async(req, res, next) => {
        new OK({
            message: "Get all discount code successful",
            metadata: DiscountService.getAllDiscountCodesByUser({
                ...req.body
            })
        }).send()
    }

    static getDiscountAmount = async(req, res, next) => {
        const { userId } = req.user
        new OK({
            message: "Get get discount amount successful",
            metadata: DiscountService.getDiscountAmount({
                ...req.body,
                userId 
            })
        }).send()
    }
    static delecteDiscount = async(req, res, next) => {
        const { userId } = req.userId
        new OK({
            message: "Delete discount successful",
            metadata: DiscountService.delecteDiscount({
                ...req.body,
                userId
            })
        }).send()
    }
    static cancelDiscount = async(req, res, next) => {
        const { userId } = req.user
        new OK({
            message: "Cancel discount successful",
            metadata: DiscountService.cancelDiscount({
                ...req.body,
                userId
            })
        }).send()
    }
}

module.exports = DiscountController