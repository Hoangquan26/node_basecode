'use strict'

const { CREATED, OK } = require("../core/success.response")
const ProductService = require("../services/product.service")

class ProductController {
    static createProduct = async(req, res, next) => {
        const {userId} = req?.userId
        new CREATED({
            message: 'successful',
            metadata: await ProductService.createProduct({
                userId,
                ...req.body
            })
        }).send(res)
    }
    static updateProduct = async(req, res, next) => {
        const {userId} = req?.userId
        new OK({
            message: 'successful',
            metadata: await ProductService.updateProduct({
                userId,
                payload: req.body
            })
        }).send(res)
    }
    static draftProductByShop = async(req, res, next) => {
        const { userId } = req?.userId
        const { productId } = req.params
        new OK({
            message: 'successful',
            metadata: await ProductService.draftProductByShop({
                userId,
                productId
            })
        }).send(res)
    }
    static publicProductByShop = async(req, res, next) => {
        const { userId } = req?.userId
        const { productId } = req.params
        new OK({
            message: 'successful',
            metadata: await ProductService.publicProductByShop({
                userId,
                productId
            })
        }).send(res)
    }
    static searchProductByUser = async(req, res, next) => {
        const keySearch = req.query.q
        new OK({
            message: 'successful',
            metadata: await ProductService.searchProductByUser({
                keySearch
            })
        }).send(res)
    }
    static getProduct = async(req, res, next) => {
        const { productId } = req.params
        new OK({
            message: 'successful',
            metadata: await ProductService.getProduct({
                unSelect: ['isPublic', 'isDraft', 'isActive', 'createAt', 'updateAt'],
                productId
            })
        }).send(res)
    }
    static getAllProductByUser = async(req, res, next) => {
        new OK({
            message: 'successful',
            metadata: await ProductService.getAllProductByUser({
                page: req.body.page,
                filter: req.body.filter,
                sort: req.body.sort
            })
        }).send(res)
    }
    static getAllProductByShop = async(req, res, next) => {
        new OK({
            message: 'successful',
            metadata: await ProductService.getAllProductByShop({
                page: req.body.page,
                filter: req.body.filter,
                sort: req.body.sort
            })
        }).send(res)
    }
}

module.exports = ProductController