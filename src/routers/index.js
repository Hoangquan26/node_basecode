'use strict'
const express = require('express')
const router = express.Router()



//check api key
router.use('/access', require('./access'))
router.use('/category', require('./category'))
router.use('/product', require('./product'))
router.use('/discount', require('./discount'))
module.exports = router