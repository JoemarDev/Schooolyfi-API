const paginateResult = require('./paginate');
const {createJWT,tokenValidation,attachCookieToResponse} = require('./jwt');
const {CheckStudentAvailability,CheckTeacherAvailability,ValidateTime,GetTimeDifference} = require('./schedule_helper');
module.exports = {
    paginateResult, //  Paginate Models
    createJWT, // Create a token
    tokenValidation, // Verify JWT Token and returns it's payload value
    attachCookieToResponse, // Attach the payload in user cookies
    CheckStudentAvailability, // Check Student Schedule Availabilty
    CheckTeacherAvailability, // Check Teacher Schedule Availabilty
    ValidateTime, // Validate pass value get the right format and convert time to become readable
    GetTimeDifference // Aceept two values Differentiate the interval between time eg:(5:20 to 7:30) =  130 minutes 
};