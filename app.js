require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// Rest Of the Packages
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

// Database
const connectDB = require('./src/database/connection');

// Router 
const studentRouter = require('./src/routes/student-routes');
const teacherRouter = require('./src/routes/teacher-routes');
const subjectRouter = require('./src/routes/subject-routes');
const classScheduleRouter = require('./src/routes/class-schedule-routes');
const authenticationRouter = require('./src/routes/authentication-route');


// Middlewares
const NotFoundMiddleware = require('./src/middleware/not-found-middleware');
const ErrorHandlerMiddlware = require('./src/middleware/error-handler');


app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/' , (req,res) => {
    res.send("Welcome to School Management API's");
});

// use routers
app.use('/api/v1/students',studentRouter);
app.use('/api/v1/teachers' , teacherRouter);
app.use('/api/v1/subjects' , subjectRouter);
app.use('/api/v1/class-schedule' , classScheduleRouter);
app.use('/api/v1/auth' , authenticationRouter)


// use middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddlware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port , console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();