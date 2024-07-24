const catchAsync = require("../utils/catchAsync");
const post = require("../db/models/post");
const user = require("../db/models/user");
const AppError = require("../utils/appError");

//create new post
const createPost = catchAsync(async (req, res, next) => {
  const body = req.body;
  const id = req.user.id;
  const newPost = await post.create({
    title: body.title,
    body: body.body,
    userId: id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return res.status(201).json({
    status: "success",
    message: "Post created successfully",
    data: newPost,
  });
});

//get all posts
const getPosts = catchAsync(async (req, res, next) => {
    // const userId = req.user.id;
    // console.log("userId: " + userId);
    const posts = await post.findAll({
    include: user,
    //where: { userId },
    order: [["createdAt", "DESC"]],
  });
  console.log(posts);
  if (!posts) {
    return next(new AppError("No posts found", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Posts retrieved successfully",
    data: posts,
  });
});

// get post by id
const getPostById = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const result = await post.findByPk(postId, {
    include: user,
  });

  if (!result) {
    return next(new AppError("Invalid post id", 400));
  }

  return res.status(200).json({
    status: "success",
    message: "Post retrieved successfully",
    data: result,
  });
});

//update post
const updatePostById = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const body = req.body;

  const result = await post.findOne({
    where: {
      id: postId,
      userId,
    },
  });
  if (!result) {
    return next(
      new AppError("Invalid post id or user not authorized to update", 400)
    );
  }

  result.title = body.title;
  result.body = body.body;
  const updatedPost = await result.save();

  return res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    data: updatedPost,
  });
});

//delete post
const deletePostById = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const result = await post.findOne({
    where: {
      id: postId,
      userId,
    },
  });
  if (!result) {
    return next(
      new AppError("Invalid post id or user not authorized to delete", 400)
    );
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Post deleted successfully",
  });
});

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
