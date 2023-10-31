import type { Document } from "mongoose";

import { z } from "zod";
import User from "../models/users.model";
import ApiError from "../utils/ApiError";
import { userSchema } from "../validation";

type UserData = z.infer<typeof userSchema>;

// CRUD
export const createUser = async (userData: UserData) => {
  const user = await User.create(userData);
  return user;
};

export const getUsers = async (options: { page: number; limit: number }) => {
  const { page, limit } = options;
  // TODO :: add pagination plugin
  const users = await User.find({
    page,
    limit,
  });
  return users;
};

export const getUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};

export const updateUser = async (
  userId: string,
  userData: Partial<UserData>
) => {
  const user = await getUser(userId);

  Object.assign(user, userData);
  await user.save();

  return user;
};

export const deleteUser = async (userId: string) => {
  const result = await User.deleteOne({ _id: userId });
  if (result.deletedCount === 0) {
    throw ApiError.notFound();
  }
  return result;
};
