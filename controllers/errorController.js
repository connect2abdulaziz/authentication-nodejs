const sendErrorDev = (error, response) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message || 'Something went wrong';
    const stack = error.stack;

    response.status(statusCode).json({
        status,
        message,
        stack,
    });
}

const sendErrorProd = (error, response) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message || 'Something went wrong';
    const stack = error.stack;

   
    if (error.isOperational){
        return response.status(statusCode).json({
            status,
            message,
        });
    }
    console.log(error.name, error.message, stack);
    return response.status(statusCode).json({
        status,
        message
    })
}

const globalErrorHandler = (err, req, res, next)  => {

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;