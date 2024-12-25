const express = require('express')
const { asyncHandle } = require('../../utills')
const ProductController = require('../../controllers/product.controller')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')
const router = express.Router()

router.get('/all', asyncHandle(ProductController.getAllProductByUser))
router.get('/:productId', asyncHandle(ProductController.getProduct))
router.get('', asyncHandle(ProductController.searchProductByUser))

router.use('', authUserMiddleware)
router.post('/create', asyncHandle(ProductController.createProduct))
router.patch('/update', asyncHandle(ProductController.updateProduct))

router.patch('/draft', asyncHandle(ProductController.draftProductByShop))
router.patch('/public', asyncHandle(ProductController.publicProductByShop))
router.get('/all-shop', asyncHandle(ProductController.getAllProductByShop))



module.exports = router