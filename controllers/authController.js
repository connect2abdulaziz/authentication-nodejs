const user = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
const signup = catchAsync(async (req, res, next) => {
    const body = req.body;
    if (!['0', '1', '2'].includes(body.userType)) {
        return next(new AppError("Invalid user type", 400));
    }
    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    if (!newUser) {
        return next(new AppError('Fail to create user', 400));
    }
    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    });

    return res.status(200).json({
        status: 'success',
        message: 'User created successfully.',
        data: result
    });
    
});

const login = catchAsync (async (req, res, next) => {
    const {email, password}= req.body;
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }
    const result = await user.findOne({where: {email}});
    
    if (!result || !(await bcrypt.compare(body.password, result.password))) {
        return next(new AppError('Invalid email or password', 400));
    }
    const token = generateToken({
        id: result.id
    });

    return res.status(200).json({
        status:'success',
        message: 'User logged in successfully.',
        data: token
    });
    
});

module.exports = { signup, login};
