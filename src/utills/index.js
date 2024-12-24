const  _ = require('lodash')
const { Types } = require('mongoose')

const asyncHandle = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}


const clearUpdateNestedValue = (object) => {
    const final = {}
    Object.keys(object).forEach((key) => {
        const val = object[key]
        if(![null, undefined].includes(val)) {
            if(typeof val == 'object' && !Array.isArray(val)) {
                const res = clearUpdateNestedValue(val)
                Object.keys(res).forEach(k => {
                    final[`${key}.${k}`] = res[k]
                })
            }
            else {
                if(Array.isArray(val))
                    final[key] = val.filter(item => ![null, undefined].includes(item))
                else
                    final[key] = val
            }
        } 
    })
    return final
}

const convertObjectIdMongoDB = id => new Types.ObjectId(id)

const authHeaders = ({refreshToken = null, accessToken = null, userId = null, options = []}) => {
    return {
        refreshToken,
        accessToken,
        userId,
        ...options
    }
}

const consoleLogDevMode = (data) => {
    const DEV_MODE = process.env.APP_MODE === 'dev'
    if(DEV_MODE) console.log(`:::${data}`)
}

const getInstanceData = ({instance, select = []}) => {
    const data = _.pick(instance, select)
    return data
}

module.exports = {
    asyncHandle,
    clearUpdateNestedValue,
    convertObjectIdMongoDB,
    authHeaders,
    consoleLogDevMode,
    getInstanceData
}