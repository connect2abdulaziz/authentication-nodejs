'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");


const Comment = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required",
        },
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Body is required",
        },
        notEmpty: {
          msg: "Body cannot be empty",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "user", 
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post", 
        key: "id",
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
    tableName: "comment",
    paranoid: true,
    freezeTableName: true,
    modelName: "comment",
  }
);



module.exports = Comment;