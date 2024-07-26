const user = require("../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const appSuccess = require("../utils/appSuccess");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const signup = catchAsync(async (req, res, next) => {
  const body = req.body;
  if (body.userType && !["0", "1", "2"].includes(body.userType)) {
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
    updatedAt: new Date(),
  });
  if (!newUser) {
    return next(new AppError("Fail to create user", 400));
  }
  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });
  return res.status(200).json(appSuccess("User created successfully",result));

});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Invalid email or password", 400));
  }
  const token = generateToken({
    id: result.id,
  });
  return res.status(200).json(appSuccess("User logged in successfully", token));
    
});

const authentication = catchAsync(async (req, res, next) => {
  // 1. get the token from header
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }
  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }

  // 2. token verification
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);

  // get the user information from db and add them to the req object
  const freshUser = await user.findByPk(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }
  req.user = freshUser;
  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    return next();
  };
  return checkPermission;
};

module.exports = { signup, login, authentication, restrictTo };
