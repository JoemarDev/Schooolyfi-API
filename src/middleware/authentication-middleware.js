const { tokenValidation } = require("../util");
const CustomError = require('../errors');
const AuthenticateUser = async(req,res,next) => {
    const {token} = req.signedCookies;

    try {
        if(!token) {
            throw new CustomError.UnAuthorizedError('Permission Denied');
        }
        req.user = tokenValidation(token);

        return next();

    } catch (error) {
        throw new CustomError.UnAuthorizedError('Something went wrong please try again later.');
    }
}

const AuthorizedPermission = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.user_type)) {
            throw new CustomError.UnAuthorizedError(`Permission Denied`)
        }
        next();
    }
}

module.exports = {AuthenticateUser , AuthorizedPermission};