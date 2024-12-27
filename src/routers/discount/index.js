'use strict'

const express = require('express')
const router = express.Router();

const DiscountController = require('../../controllers/discount.controller')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')

// initial user router
router.get('all', DiscountController.getAllDiscountCodesByShop)

router.use('', authUserMiddleware)

// initial admin/manager router



module.exports = router