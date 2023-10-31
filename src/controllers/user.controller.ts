import httpStatus from "http-status";
import User from "../models/users.model";
import catchAsync from "../utils/catchAsync";

// CRUD

export const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(httpStatus.CREATED).json({ status: "success", data: user });
});

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(httpStatus.OK).json({ status: "success", data: users });
});

export const getUser = catchAsync(async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  res.status(httpStatus.OK).json({ status: "success", data: user });
});

export const updateUser = catchAsync(async (req, res) => {
  const 
