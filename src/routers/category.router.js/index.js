'use strict'
const CategoryController = require('../../controllers/category.controller')
const { asyncHandle } = require('../../utills/index')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')
const express = require('express')
const router = express.Router()


router.get('', asyncHandle(CategoryController.getAllCategories))
router.use('', authUserMiddleware)
router.post('', asyncHandle(CategoryController.createCategory))
router.patch('/:cateId', asyncHandle(CategoryController.updateCategory))
router.patch('/:cateId/active', asyncHandle(CategoryController.activeCategory))
router.patch('/:cateId/inactive', asyncHandle(CategoryController.inactiveCategory))

module.exports = router
