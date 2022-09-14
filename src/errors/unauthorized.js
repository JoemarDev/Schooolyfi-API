const {StatusCodes} = require('http-status-codes');
class UnAuthorizedError extends Error {
    constructor(messsage) {
        super(messsage);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthorizedError;