'use strict'
const bcrypt = require('bcrypt')
const { getUserByEmail } = require("../models/repo/user.repo")
const { BadRequestError, ConflictRequestError } = require('../core/error.response')
const { generateKeyPairSync, generateTokenPairSync } = require('../utills/jwt.util')
const { consoleLogDevMode, getInstanceData } = require('../utills')
const userModel = require('../models/user.model')
const keyTokenModel = require('../models/keytoken.model')
const { USER_ROLE } = require('../configs/user.config')
const KeyTokenService = require('./keyToken.service')
const { deleteKeyTokenByUserId } = require('../models/repo/keyToken.repo')
class AccessService {
    static login = async({email, password}) => {
        const foundUser = await getUserByEmail(email)
        if(!foundUser) throw new BadRequestError('Account is not exist')

        const validLogin = bcrypt.compareSync(password, foundUser.password)
        if(!validLogin) throw new BadRequestError('Wrong password')

        const { publicKey, privateKey } = generateKeyPairSync()
        if(!publicKey || !privateKey) throw new BadRequestErrorI('Something wrong')
      

        const payload = {
            userId: foundUser._id,
            email: foundUser.email,
            name: foundUser.name,
            roles: foundUser.roles
        }
        const tokens = generateTokenPairSync({payload, privateKey})
        if(!tokens) throw new BadRequestErrorI('Something wrong')
        const { accessToken, refreshToken } = tokens 
        const newKeyToken =  KeyTokenService.createKeyToken({userId: foundUser._id, publicKey, privateKey, refreshToken})

        if(!newKeyToken) throw new BadRequestError('Something wrong')

        return {
            user: {
                userId: payload.userId,
                ...getInstanceData({instance: foundUser, select: ['_id', '_email', 'name', 'roles']})
            },
            tokens: { accessToken, refreshToken }
        }
    }

    static register = async({email, password, name = `UNKNOWN`}) => {
        const foundUser = await getUserByEmail(email)
        if(foundUser) throw new BadRequestError('Email was registered')
        const saltRound = Number(process.env.HASH_SALTROUND) ?? 10
        const hashedPassword = bcrypt.hashSync(password, saltRound)
        
        const newUser = await userModel.create({
            name, email, password: hashedPassword, roles: [USER_ROLE.USER]
        })
        if(!newUser) throw new BadRequestErrorI('Something wrong')
            
        consoleLogDevMode(newUser)
        return {
            user: getInstanceData({instance: newUser, select: ['_email', 'name']}),
        }
    }

    static refresh = async({refreshToken, user, keyStore}) => {
        if(keyStore.refreshTokenUsed.includes(refreshToken)) {
            await KeyTokenService.removeKeyById(keyStore._id)
            throw new ConflictRequestError('Something wrong')
        }

        if(keyStore.refreshToken !== refreshToken) {
            throw new BadRequestError('Something wrong')
        }

        const foundUser = await userModel.findOne({ email: user.email })
        if(!foundUser)  throw new BadRequestError('Shop wasn\'t registered!')

        const payload = {
            userId: foundUser._id,
            email: foundUser.email,
            name: foundUser.name,
            roles: foundUser.roles
        }
        const tokens = generateTokenPairSync({payload, privateKey: keyStore.privateKey})
        // keyStore.refreshTokensUsed.push(refreshToken)
        // keyStore.refreshToken = tokens.refreshToken
        keyStore.save()
        return {
            user: {
                userId: payload.userId,
                ...getInstanceData({instance: foundUser, select: [ '_email', 'name', 'roles']})
            },
            tokens :{
                accessToken: tokens.accessToken,
                refreshToken
            }
        }
    }

    static logout = async({userId}) => {
        
        const foundUser = await userModel.findById(userId)
        if(!foundUser) throw new BadRequestError('Something wrong')
        
        await deleteKeyTokenByUserId(userId)
        return {
            userId: userId
        }
    }
}

module.exports = AccessService