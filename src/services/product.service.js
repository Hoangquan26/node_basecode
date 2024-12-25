'use strict'

const { BadRequestError } = require("../core/error.response")
const categoriesModel = require("../models/categories.model")
const productModel = require('../models/product.model')
const { convertObjectIdMongoDB, clearUpdateNestedValue, readUnselectArray } = require("../utills")
class ProductService {
    static createProduct = async({userId, product_name, product_thumb, product_price, product_quantity, 
        product_description, categoryId, product_attributes, product_rating, isPublic}) => {
        // product_shop now be userId
        const foundType = await categoriesModel.findById(categoryId)
        if(!foundType) throw new BadRequestError(`Category not exist`)
        const newProduct = await productModel.create({
            product_name, product_thumb, product_price, product_quantity,
            product_description, product_attributes, product_rating,
            product_shop: userId
        })
        
        if(!newProduct) throw new BadRequestError('Something wrong')
        if(isPublic) {
            newProduct.isDraft = false
            newProduct.isPublic = true
            newProduct.save()
        }

        return newProduct
    }

    static updateProduct = async({productId, userId, payload}) => {
        const clearPayload = clearUpdateNestedValue(payload)
        const filter = {
            _id: convertObjectIdMongoDB(productId),
            product_shop: convertObjectIdMongoDB(userId)
        }
        const options = {
            new: true
        }
        const updateProduct = await productModel.findOneAndUpdate(filter, payload, options )
        return updateProduct
    }

    static draftProductByShop = async({productId, userId}) => {
        const foundProduct = await productModel.findOne({
            _id: convertObjectIdMongoDB(productId),
            product_shop: convertObjectIdMongoDB(userId)
        })
    
        if(!foundProduct) throw new BadRequestError('Not found product')
        foundProduct.isDraft = false
        foundProduct.isPublic = true
        return await foundProduct.save()
    }

    static publicProductByShop = async({productId, userId}) => {
        const foundProduct = await productModel.findOne({
            _id: convertObjectIdMongoDB(productId),
            product_shop: convertObjectIdMongoDB(userId)
        })
    
        if(!foundProduct) throw new BadRequestError('Not found product')
        foundProduct.isDraft = false
        foundProduct.isPublic = true
        return await foundProduct.save()
    }

    static searchProductByUser = async({ keySearch = "" }) => {
        const regexSearch = new RegExp(keySearch)
        return await productModel.find({
            $text: {$search: regexSearch}
        },{
            score: {$meta: 'textScore'}
        }).sort({score: {$meta: 'textScore'}})
        .lean()
    }

    static getProduct = async({unSelect = [], productId}) => {
        return await productModel.find({
            _id: new Types.ObjectId(productId)
        })
        .select(readUnselectArray(unSelect))
        .lean()
    }

    static getAllProductByUser = async({limit = 50, page = 1, select = ['product_name', 'product_thumb', 'product_price'],
        filter = {}, sort = {_id: -1}}) => {
        const skip = (page - 1) * limit
        return await productModel.find({
            isPublic: true,
            ...filter
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(readSelectArray(select))
        .lean()
    }

    static getAllProductByShop = async({limit = 50, page = 1, select = ['product_name', 'product_thumb', 'product_price'],
        filter = {}, sort = {product_id: -1}}) => {
        const skip = (page - 1) * limit
        return await productModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(readSelectArray(select))
        .lean()
    }
    
}

module.exports = ProductService