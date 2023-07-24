const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, req) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    sameSite: "none",
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");

  res.status(200).json({
    status: "success",
    data: {
      data: {},
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Внесете корисничко име и лозинка", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new AppError("Не може да се пронајде корисникот", 401));
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Погрешно корисничко име или лозинка", 401));
  }

  req.user = user;
  createSendToken(user, 200, res, req);
});

exports.checkUser = catchAsync(async (req, res, next) => {
  let currentUser;
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
    currentUser.password = null;
  } else {
    return next(
      new AppError(
        "Не сте најавени, ве молиме најавете се за да продолжите",
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      data: currentUser,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Не сте логиран", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("Корисникот не е пронајден", 401));
  }

  req.user = currentUser;
  next();
});
