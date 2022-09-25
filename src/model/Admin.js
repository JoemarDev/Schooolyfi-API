const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = mongoose.Schema({
    userName : {
        type : String,
        required : [true  , 'Please provide a username'],
    },
    password : {
        type : String,
        required : [true , 'Please provide a admin password'],
    }
});


AdminSchema.pre('save', async function() {

    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
});


AdminSchema.methods.comparePassword = async function (candidatePassword)  {
    const isMatch = await bcrypt.compare(candidatePassword , this.password);
    return isMatch;
};





module.exports = mongoose.model('Admin', AdminSchema);