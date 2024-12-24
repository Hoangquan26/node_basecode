'use strict'


const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const { AuthenticateError } = require('../core/error.response');

const generateKeyPairSync = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        },
    });
    return {
        publicKey, privateKey
    }
}

const generateTokenPairSync = ({payload, privateKey}) => {
    const accessToken = signToken(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '10s'
    })
    const refreshToken = signToken(payload, privateKey,  {
        algorithm: 'RS256',
        expiresIn: '7d'
    })

    return {accessToken, refreshToken}
}

const signToken = (payload, secret, options) => {

    try {
        return jwt.sign(payload, secret, { ...options });
    }
    catch {

    }
};

const verifyToken = (token, secret, options = {
    algorithm: 'RS256'
}) => {
    try {
        console.log(token, secret)
        return jwt.verify(token, secret, {...options});
    }
    catch (e){
        console.log(e)
        throw new AuthenticateError('Auth error')
    }
};


module.exports = { verifyToken, signToken, generateKeyPairSync, generateTokenPairSync };