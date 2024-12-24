'use strict'

const express = require('express')
const { asyncHandle } = require('../../utills')
const AccessController = require('../../controllers/access.controller')
const { authUserMiddleware } = require('../../middlewares/auths/authUser')
const router = express.Router()

router.post('/login', asyncHandle(AccessController.login))
router.post('/register', asyncHandle(AccessController.register))

router.use('/', authUserMiddleware)
router.post('/logout', asyncHandle(AccessController.logout))
router.post('/refresh', asyncHandle(AccessController.refresh))
module.exports = router