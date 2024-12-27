'use strict'

const express = require('express')
const router = express.Router();

const DiscountController = require('../../controllers/discount.controller')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')


router.get('all', DiscountController.getAllDiscountCodesByShop)

module.exports = router