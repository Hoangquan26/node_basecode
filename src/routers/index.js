'use strict'
const express = require('express')
const router = express.Router()



//check api key
router.use('/access', require('./access.router.js'))
router.use('/category', require('./category.router.js'))
router.use('/product', require('./product'))
module.exports = router