'use strict'
const { OK, CREATED } = require('../core/success.response')
const CategoryService = require('../services/category.service')
const { authHeaders } = require('../utills')


class CategoryController {
    static getAllCategories = async(req, res, next) => {
        const user = req?.user
        new OK({
            message: 'Get all categories successfully',
            metadata: await CategoryService.getAllCategories()
        }).send(res)
    }

    static createCategory = async(req, res, next) => {
        const user = req?.user
        new CREATED({
            message: 'Create category successfully',
            metadata: await CategoryService.createCategory({user, ...req.body})
        }).send(res)
    }

    static updateCategory = async(req, res, next) => {
        const user = req?.user
        const {cateId} = req.params
        new CREATED({
            message: 'Update category successfully',
            metadata: await CategoryService.createCategory({user, cateId, ...req.body})
        }).send(res)
    }

    static activeCategory = async(req, res, next) => {
        const user = req?.user
        const {cateId} = req.params
        new CREATED({
            message: 'Update category successfully',
            metadata: await CategoryService.activeCategory({user, cateId, ...req.body})
        }).send(res)
    }

    static inactiveCategory = async(req, res, next) => {
        const user = req?.user
        const {cateId} = req.params
        new CREATED({
            message: 'Update category successfully',
            metadata: await CategoryService.inactiveCategory({user, cateId, ...req.body})
        }).send(res)
    }    
}

module.exports = CategoryController