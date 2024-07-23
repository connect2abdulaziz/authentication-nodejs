require('dotenv').config({path: `${process.cwd()}/.env`});

const catchAsync = require('./utils/catchAsync');
const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

const authRouter = require('./routes/authRoute');



app.use(express.json());



// all routes will be there

app.use('/api/v1/auth', authRouter);


app.use('*', 
    catchAsync(async (err, req, res) => {
        throw new AppError(`Can't find ${req.originalUrl} on the server`, 404);
    })
);

//Global error handler
app.use(globalErrorHandler);


const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
