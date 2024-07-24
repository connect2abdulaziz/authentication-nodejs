'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const AppError = require('../../utils/appError');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const Post = require('./post'); 

const User = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User type is required',
        },
        notEmpty: {
          msg: 'User type cannot be empty',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required',
        },
        notEmpty: {
          msg: 'First name cannot be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required',
        },
        notEmpty: {
          msg: 'Last name cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Invalid email format',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 8) {
          throw new AppError('Password must be at least 8 characters long', 400);
        }
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(this.password, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError('Passwords do not match', 400);
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: 'user',
    freezeTableName: true,
    paranoid: true,
    modelName: 'user',
  }
);

// association definition
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
