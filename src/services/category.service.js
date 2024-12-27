'use strict'

const { BadRequestError } = require("../core/error.response")
const categoryModel = require('../models/categories.model')
const { convertObjectIdMongoDB } = require("../utills")

class CategoryService {
    static createCategory = async({userId, cate_name, cate_thumb, cate_description}) => {
      
        if(!userId ) throw new BadRequestError('Something wrong')
        const newCate = await categoryModel.create({
            cate_name,
            cate_description,
            cate_thumb,
            userId  
        })
        return newCate
    }

    static updateCategory = async({cateId, userId, payload}) => {
        console.log(cateId, userId, payload)
        if(!userId ) throw new BadRequestError('Something wrong')
        const filter = {
            userId,
            _id: convertObjectIdMongoDB(cateId)
        }
        const update = {
            ...payload
        }
        const options = {
            new: true
        }
        return await categoryModel.findOneAndUpdate(filter, update, options)
    }

    static activeCategory = async({cateId, userId}) => {
        if(!userId ) throw new BadRequestError('Something wrong')

        const foundCate = await categoryModel.findOne({
            _id: convertObjectIdMongoDB(cateId),
            userId
        })

        if(!foundCate) throw new BadRequestError('Not found')
        foundCate.is_active = true
        foundCate.save()
        return foundCate
    }

    static inactiveCategory = async({cateId, userId}) => {
        if(!userId ) throw new BadRequestError('Something wrong')

        const foundCate = await categoryModel.findOne({
            _id: convertObjectIdMongoDB(cateId),
            userId
        })

        if(!foundCate) throw new BadRequestError('Not found')
        foundCate.is_active = false
        foundCate.save()
        return foundCate
    }

    // static getAllCategories = async({user}) => {
    //     const { userId } = user
    //     if(!userId ) throw new BadRequestError('Something wrong')
    //     return await categoryModel.find({userId})
    // }
    
    static getAllCategoriesByUser = async({limit = 25, page = 1, sort = {_id: 1}, filter = {}}) => {
        const skip = (page - 1) * limit
        return await categoryModel.find({
            is_active: true,
            ...filter
        }).skip(skip).limit(limit).sort(sort).lean()
    }

    static getAllCategoriesByShop = async({limit = 25, page = 1, sort = {_id: 1}, filter = {}}) => {
        const skip = (page - 1) * limit
        const { userId } = user
        if(!userId ) throw new BadRequestError('Something wrong')
        return await categoryModel.find({
            filter,
            userId: convertObjectIdMongoDB(userId)
        }).skip(skip).limit(limit).sort(sort).lean()
    }

}

module.exports = CategoryService