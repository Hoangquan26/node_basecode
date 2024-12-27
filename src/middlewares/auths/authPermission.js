const { BadRequestError, AuthenticateError } = require("../../core/error.response")

const authPermission = (permission = []) => {
    return (req, res, next) => {
        const user = req.user
        if(!user) throw new BadRequestError('Not found user')
        const validPermission = permission.every(per => user.roles.includes(per))
        if(!validPermission) throw new AuthenticateError('Something wrong')
        return next()
    }
}

module.exports = authPermission