'use strict'

const express = require('express')
const router = express.Router();

const DiscountController = require('../../controllers/discount.controller')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')
const authPermission = require('../../middlewares/auths/authPermission');
const { USER_ROLE } = require('../../configs/user.config');
const { asyncHandle } = require('../../utills');
// initial user router
router.get('/all', asyncHandle(DiscountController.getAllDiscountCodesByUser))
router.get('/available', asyncHandle(DiscountController.findAllProductAvailable))
router.use('', authUserMiddleware)
router.post('/amount', asyncHandle(DiscountController.getDiscountAmount))
router.post('/cancel', asyncHandle(DiscountController.cancelDiscount))
// initial admin/manager router

router.use('/', authPermission([USER_ROLE.ADMIN, USER_ROLE.SHOP]))
router.get('/all-shop', asyncHandle(DiscountController.getAllDiscountCodesByShop))
router.post('/insert', asyncHandle(DiscountController.insertDiscount))
router.patch('/update', asyncHandle(DiscountController.updateDiscount))
router.delete('/delete', asyncHandle(DiscountController.delecteDiscount))

module.exports = router