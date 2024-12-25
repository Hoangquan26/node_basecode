'use strict'

const { BadRequestError } = require("../core/error.response")
const categoryModel = require('../models/categories.model')
const { convertObjectIdMongoDB } = require("../utills")

class CategoryService {
    static createCategory = async({user, cate_name, cate_thumb, cate_description}) => {
        const { userId } = user
        if(!userId ) throw new BadRequestError('Something wrong')
        const newCate = await categoryModel({
            cate_name,
            cate_description,
            cate_thumb,
            userId  
        })

        return newCate
    }

    static updateCategory = async({cateId, user, payload}) => {
        const { userId } = user
        if(!userId ) throw new BadRequestError('Something wrong')
        const filter = {
            userId,
            _id: convertObjectIdMongoDB(cateId)
        }
        const update = {
            payload
        }
        const options = {
            upsert: true,
            new: true
        }
        return await categoryModel.findOneAndUpdate(filter, update, options)
    }

    static activeCategory = async({cateId, user}) => {
        const { userId } = user
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

    static inactiveCategory = async() => {
        const { userId } = user
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
    
    static getAllCategories = async() => {
        const { userId } = user
        if(!userId ) throw new BadRequestError('Something wrong')
        return await categoryModel.find({is_active: true}).lean()
    }


}

module.exports = CategoryService