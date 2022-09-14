const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err,req,res,next) => {

    console.log(err);
    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message  || 'Something went wrong please try again later',
    };

    // MongoDB Custom Error

    // Error if fetching unknown data
    if(err.name === 'CastError') {
        customError.msg = `No item found with id ${err.value}`,
        customError.statusCode = 400;
    }

    // Error if submiting a empty fields
    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
        customError.statusCode = 400;
    }

    // Error if submiting a same data if the schema required a unique value
    if(err.code && err.code == 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
        customError.statusCode = 400;
    }

    return res.status(customError.statusCode).json(customError);

};

module.exports = errorHandlerMiddleware;