'use strict'

const express = require('express')
const router = express.Router()

router.post('/login', (req, res, next) => {
    return res.status(200).json({
        message: 'ok'
    })
})

module.exports = router