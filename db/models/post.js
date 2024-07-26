"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Comment = require("./comment");


const Post = sequelize.define(
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
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
  
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "user", 
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
  },
  {
    sequelize,
    tableName: "post",
    paranoid: true,
    freezeTableName: true,
    modelName: "post",
  }
);

//association
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });


module.exports = Post;
