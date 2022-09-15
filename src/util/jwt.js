const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createJWT = ({payload}) => {
    return jwt.sign(payload , process.env.JWT_SECRET);
};

const tokenValidation = (token) => {
    return jwt.verify(token , process.env.JWT_SECRET);
}

const attachCookieToResponse = ({res , user}) => {
    const token = createJWT({payload : user});

    const expiry = 1000 * 60 * 60 * 24 * 7; //one week

    res.cookie('token' , token , {
        httpOnly : true,
        expires : new Date(Date.now() + expiry),
        secure : process.env.NODE_ENV === 'production',
        signed : true,
    });
};

module.exports = {
    createJWT,
    tokenValidation,
    attachCookieToResponse
}