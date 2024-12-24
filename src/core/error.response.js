'use strict'
const { StatusCodes, ReasonPhrases } = require('../configs/statuscode/httpStatusCode')

class ErrorResponse extends Error {
    constructor( message, status ) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ErrorResponse {
    constructor( message = ReasonPhrases.BAD_REQUEST, status = StatusCodes.BAD_REQUEST ) {
        super(message, status)
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor( message = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT ) {
        super(message, status)
    }
}

class AuthenticateError extends ErrorResponse {
    constructor( message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED ) {
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse {
    constructor( message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND ) {
        super(message, status)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor( message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN ) {
        super(message, status)
    }
}

module.exports = {
    BadRequestError,
    ConflictRequestError,
    AuthenticateError,
    NotFoundError,
    ForbiddenError
}