'use strict'

const { BadRequestError } = require("../core/error.response")
const categoriesModel = require("../models/categories.model")

class ProductService {
    static createProduct = async({userId, product_name, product_thumb, product_price, product_quantity, 
        product_description, categoryId, product_attributes, product_rating}) => {
        // product_shop now be userId
        const foundType = await categoriesModel.findById(categoryId)
        if(!foundType) throw new BadRequestError(`Category not exist`)

        
    }

    static updateProduct = () => {

    }

    static draftProduct = () => {

    }
    
    static publicProduct = () => {

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

    static getProduct = async({unSelect = [], product_id}) => {
        
    }

    static getAllProduct = async({limit = 50, page = 1, select = ['product_name', 'product_thumb', 'product_price'],
        filter = {isPublic: true}, sort = {product_id: -1}}) => {
       
    }
    
}

module.exports = ProductService