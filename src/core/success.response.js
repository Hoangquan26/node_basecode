'use strict'
const { StatusCodes, ReasonPhrases } = require('../configs/statuscode/httpStatusCode')

class SuccessResponse {
    constructor({message, code, reasonPhase, metadata = {}, options = {}}) {
        this.message = message
        this.reasonPhase = reasonPhase
        this.metadata = metadata
        this.options = options
        this.code = code
    }

    send = (res, options = {
        cookies: null,
        clearCookie: null
    }) => {
        const {cookies, clearCookie} = options
        if(![undefined, null].includes(cookies)) {
            cookies.forEach(cookie => {
                res.cookie(cookie.name, cookie.value, cookie.option)
            })
        } 
        else if (![undefined, null].includes(clearCookie)) {
           clearCookie.forEach(item => {
                res.clearCookie(item)
           })
        }
        return res.status(this.code).json({
            metadata:this.metadata,
            options: this.options,
            message: this.message,
            code: this.statusCode,
            status: 'success'
        })
    }
}

class OK extends SuccessResponse {
    constructor({message, code = StatusCodes.OK, reasonPhase = ReasonPhrases.OK, metadata = {}, options = {}}) {
        super({message, code, reasonPhase, metadata, options})
    }
}


class CREATED extends SuccessResponse {
    constructor({message, code = StatusCodes.CREATED, reasonPhase = ReasonPhrases.CREATED, metadata = {}, options = {}}) {
        super({message, code, reasonPhase, metadata, options})
    }
}

module.exports = {
    OK
    ,CREATED
}