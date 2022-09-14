const {StatusCodes} = require('http-status-codes');
const NotFound = async(req,res) => res.status(StatusCodes.NOT_FOUND).send('Route does not exists');

module.exports = NotFound;