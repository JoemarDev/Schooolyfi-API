const Project = require('../model/Project');
const Subject = require('../model/Subject');
const Student = require('../model/Student');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const CreateProject = async(req,res) => {
    const {subject , student} = req.body;
    
    if(!subject || !student) {
        throw new CustomError.BadRequestError('Please provide subject and student');
    }
    
    const isSubjectExists = await Subject.findOne({_id : subject});

    if(!isSubjectExists) {
        throw new CustomError.NotFoundError(`No subject with id : ${subject}`);
    }

    const isStudentExist =  await Student.findOne({_id : student});

    if(!isStudentExist) {
        throw new CustomError.NotFoundError(`No Student with id : ${student}`);
    }
    
    // Check if the student own the subject
    if(isSubjectExists.course.toString() != isStudentExist.course.toString()) {
        throw new CustomError.BadRequestError('Student does not own the subject, unable to create project.')
    }

    console.log(req.body)
    const project = await Project.create(req.body);

    res.status(StatusCodes.CREATED).json({project});
    
};

const GetAllProject = async(req,res) => {
    const projects = await Project.find({ type : req.body.type});
    res.status(StatusCodes.OK).json({projects});
}

const GetSingleProject = async(req,res) => {
    const {id} = req.params;
    
    const project = await Project.findOne({_id : id , type : req.body.type});

    if(!project) {
        throw new CustomError.NotFoundError(`No project with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({project});
}

const RemoveProject = async(req,res) => {
    
    const {id} = req.params;
    
    const project = await Project.findOne({_id : id , type : req.body.type});

    if(!project) {
        throw new CustomError.NotFoundError(`No project with id : ${id}`);
    }

    await project.remove();

    res.status(StatusCodes.OK).send("Project Delete Successfully");
}

const UdpateProject = async(req,res) => {
    const {id} = req.params;

    const project = await Project.findOneAndUpdate(
        {_id :  id, type : req.body.type},
        req.body,
        {new : true , runValidators : true}
    );

    if(!project) {
        throw new CustomError.NotFoundError(`No project with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({project})
}

module.exports = {
    CreateProject,
    GetAllProject,
    GetSingleProject,
    RemoveProject,
    UdpateProject
}