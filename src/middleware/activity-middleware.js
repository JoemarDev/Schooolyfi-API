const AssignPropertyType = (...type) => {
    return (req,res,next) => {
        req.body.type = type[0];
        next();
    }
};

module.exports = {
    AssignPropertyType,
}