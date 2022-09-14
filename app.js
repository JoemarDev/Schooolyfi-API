require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// Rest Of the Packages
const mongoSanitize = require('express-mongo-sanitize');

// Database
const connectDB = require('./src/database/connection');

// Routes 
const studentRouter = require('./src/routes/studentRoutes');

// Middlewares
const NotFoundMiddleware = require('./src/middleware/not-found-middleware');
const ErrorHandlerMiddlware = require('./src/middleware/error-handler');


app.use(express.json());
app.use(mongoSanitize());

app.get('/' , (req,res) => {
    res.send("Welcome to Schoole Management API's");
})


app.use('/api/v1/students',studentRouter);

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