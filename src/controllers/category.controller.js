'use strict'
const { OK, CREATED } = require('../core/success.response')
const CategoryService = require('../services/category.service')



class CategoryController {
    static getAllCategoriesByUser = async(req, res, next) => {
         new OK({
            message: 'Get all categories successfully',
            metadata: await CategoryService.getAllCategoriesByUser({...req.query})
        }).send(res)
    }

    static getAllCategoriesByShop= async(req, res, next) => {
        new OK({
            message: 'Get all categories successfully',
            metadata: await CategoryService.getAllCategoriesByShop({...req.query})
        }).send(res)
    }

    static createCategory = async(req, res, next) => {
        const {userId} = req?.user
        new CREATED({
            message: 'Create category successfully',
            metadata: await CategoryService.createCategory({userId, ...req.body})
        }).send(res)
    }

    static updateCategory = async(req, res, next) => {
        const {userId} = req?.user
        const {cateId} = req.params
 
        new OK({
            message: 'Update category successfully',
            metadata: await CategoryService.updateCategory({userId, cateId,payload: req.body})
        }).send(res)
    }

    static activeCategory = async(req, res, next) => {
        const { userId } = req?.user
        const {cateId} = req.params
        new CREATED({
            message: 'Update category successfully',
            metadata: await CategoryService.activeCategory({userId, cateId, ...req.body})
        }).send(res)
    }

    static inactiveCategory = async(req, res, next) => {
        const { userId }  = req?.user
        const {cateId} = req.params
        new CREATED({
            message: 'Update category successfully',
            metadata: await CategoryService.inactiveCategory({userId, cateId, ...req.body})
        }).send(res)
    }    
}

module.exports = CategoryController