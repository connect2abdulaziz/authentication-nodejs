const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    if (!users) {
        return next(new AppError('No users found in the database'));
    }
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

//get user by id
const getUserById = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const userResponse = await user.findByPk(userId, {
        attributes: { exclude: ['password'] },
    });
    if (!userResponse) {
        return next(new AppError('User not found'));
    }
    return res.status(200).json({
        status:'success',
        data: userResponse,
    });
});

//delete user
const deleteUser = catchAsync(async (req, res, next) => {

    const userId = req.params.id;
    const userResponse = await user.findByPk(userId, {
        where : {
            userType: {
                [Sequelize.Op.ne]: '0',
            },
        },
    });
    if (!userResponse) {
        return next(new AppError('User not found'));
    }
    await userResponse.destroy();
    return res.json({
        status:'success',
        message: 'User deleted successfully',
    });
});

// update user 
const updateUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const {firstName, lastName} = req.body;
    const updatedUser = await user.update(
        {   firstName, lastName },
        { where: { id: userId } }
    );
        
    if (!updatedUser) {
        return next(new AppError('Fail to update user'));
    }
    return res.json({
        status:'success',
        message: 'User updated successfully',
    });
});

module.exports = { getAllUser, getUserById, deleteUser, updateUser };