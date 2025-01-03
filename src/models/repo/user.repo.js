'use strict'
const userModel = require('../user.model')
const getUserByEmail = async(email) => {
    return await userModel.findOne({
        email: email
    }).lean()
}

module.exports = {
    getUserByEmail
}