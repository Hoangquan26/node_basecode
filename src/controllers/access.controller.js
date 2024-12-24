'use strict'
const { OK, CREATED } = require('../core/success.response')
const { authHeaders } = require('../utills')
const AccessService = require('../services/access.service')
const HEADER = require('../configs/header.configs')

class AccessController {
    static login = async(req, res, next) => {
        const{email, password } = req.body
        let metadata =  await AccessService.login({
            email, password
        })
        const refreshToken = metadata.tokens.refreshToken
        const clientId = metadata.user.userId
        metadata.tokens.refreshToken = null
        new OK({
            message: 'Login successfully',
            metadata
        }).send(res,{
            cookies: [
                {
                    name: HEADER.REFRESH_TOKEN,
                    value: refreshToken,
                    option: {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: 'None',
                        path: '/access/refresh'
                    }
                },
                {
                    name: HEADER.CLIENT_ID,
                    value: clientId,
                    option: {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: 'None'
                    }
                }
            ]
        })
    }

    static register = async(req, res, next) => {
        const{email, password} = req.body
        new CREATED({
            message: 'Login successfully',
            metadata: await AccessService.register({
                email, password
            })
        }).send(res)
    }

    static logout = async(req, res, next) => {
        const user = req?.user
        new OK({
            messsage: 'Logout successfully',
            metadata: await AccessService.logout(user)
        }).send(res, {
            clearCookie: [HEADER.REFRESH_TOKEN, HEADER.CLIENT_ID]
        })
    }

   static refresh = async(req, res, next) => {
        const keyStore = req?.keyStore
        const user = req?.user
        const refreshToken = req?.refreshToken
        let metadata = await AccessService.refresh({
            keyStore,
            refreshToken,
            user
        })
        metadata.tokens.refreshToken = null
        new OK({
            messsage: 'Refresh successfully',
            metadata
        }).send(res,{
            cookies: [
                {
                    name: HEADER.REFRESH_TOKEN,
                    value: refreshToken,
                    option: {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: 'None',
                        path: '/access/refresh'
                    }
                }
            ]
        })
   }
}

module.exports = AccessController