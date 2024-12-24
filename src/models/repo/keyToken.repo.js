'use strict'

const { convertObjectIdMongoDB } = require("../../utills")
const keytokenModel = require("../keytoken.model")

const findKeyTokenByUserId = (userId) => {
    return keytokenModel.findOne({userId: convertObjectIdMongoDB(userId)})
} 

const deleteKeyTokenByUserId = (userId) => {
    return keytokenModel.deleteOne({userId: convertObjectIdMongoDB(userId)})
}

module.exports = {
    findKeyTokenByUserId,
    deleteKeyTokenByUserId
}