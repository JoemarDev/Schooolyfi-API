const Admin = require('../model/Admin');
const CustomError = require('../errors');
const {attachCookieToResponse} = require('../util');
const {StatusCodes}  = require('http-status-codes');

const AdminLogin = async(req,res) => {

    const {userName , password} = req.body;

    if(!userName || !password) {
        throw new CustomError.BadRequestError('Please provide a username , password');
    }

    const admin = await Admin.findOne({userName});

    if(!admin) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials');
    }
    
    const isPasswordCorrect = await admin.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError("Invalid Credentials");
    }

    const TokenPayload = {'user_type' : 'admin', 'user_id' : admin._id};

    await attachCookieToResponse({user : TokenPayload , res});

    res.status(StatusCodes.OK).json(TokenPayload);

};




const UpdateAdminPassword = async(req,res) => {

    const {password} = req.body; 
    
    if(!password) {
        throw new CustomError.BadRequestError('Please provide the updated password');
    }

    const admin  = await Admin.findOne({userName : 'admin'});

    if(!admin) {
        throw new CustomError.BadRequestError("No found admin account, please create one.");
    }

    admin.password = password;

    admin.save();

    res.send("Admin Password Update Succesfully.");
};


const CreateAdminAccount = async(req,res) => {

    const existingAccount = await Admin.find({});
    

    if(existingAccount.length > 0) {
        throw new CustomError.BadRequestError('Unable to create multiple admin account');
    }

    const AdminUserName = "admin";
    const AdminPassword = "admin";

    const account = Admin.create({
        userName : AdminUserName,
        password : AdminPassword,
    });

    res.send("Successfully Created a default admin account");
};


module.exports = {
    AdminLogin,
    UpdateAdminPassword,
    CreateAdminAccount,
}