'use strict'

const { findKeyTokenByUserId } = require('../../models/repo/keyToken.repo')
const { asyncHandle } = require("../../utills")
const HEADER = require('../../configs/header.configs')
const { BadRequestError } = require('../../core/error.response')
const { verifyToken } = require('../../utills/jwt.util')

const authUserMiddleware = asyncHandle(async(req, res, next) => {
    const userId = req.cookies[HEADER.CLIENT_ID] ?? null
    if(!userId) throw new BadRequestError('Invalid Request')
    const refreshToken = req.cookies[HEADER.REFRESH_TOKEN] ?? null
    const accessToken = req.headers[HEADER.AUTHORIZATION] ?? null
    console.log(refreshToken)
    const keyStore = await findKeyTokenByUserId(userId)
    if(!keyStore) throw new BadRequestError('Authenticate Error')

    if(refreshToken) {
       
        const decodeUser = verifyToken(refreshToken, keyStore.publicKey)
        if(userId != decodeUser.userId) throw new AuthenticateError('Invalid UserID')
        req.keyStore = keyStore
        req.user = decodeUser
        req.refreshToken = refreshToken
        return next()
    }

    const decodeUser = verifyToken(accessToken, keyStore.publicKey)
    if(userId != decodeUser.userId) throw new AuthenticateError('Invalid UserID')
    req.keyStore = keyStore
    req.user = decodeUser
    return next()
})

module.exports = {
    authUserMiddleware
}