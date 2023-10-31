import mongoose from "mongoose";
import httpStatus from "http-status";
import crypto from "crypto";
import ApiError from "../utils/ApiError";
import config from "../config";
const { roles } = config;
import { z } from "zod";

console.log("roles", roles, config, crypto);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate(value: string) {
        if (!z.string().email().isEmail) {
          throw new Error("Please provide a valid email");
        }
      },
      trim: true,
      unique: true,
      lowercase: true,
    },
    salt: {
      type: String,
      reqired: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add pagination plugin
userSchema.plugin(require("./plugins/pagination.plugin"));

const User = mongoose.model("User", userSchema);

// hash password before saving
userSchema.pre("save", async function (next: Function) {
  const user = this;

  if (!user.isModified("password")) return next();
  const email = user.email;
  try {
    const salt = crypto.randomBytes(5).toString("hex");
    const hash = crypto
      .pbkdf2Sync(user.password, salt + email, 1000, 64, "sha256")
      .toString("hex");
    user.salt = salt;
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;

  try {
    const hash = crypto
      .pbkdf2Sync(password, user.salt + user.email, 1000, 64, "sha256")
      .toString("hex");

    return user.password === hash;
  } catch (err) {
    throw new ApiError(
      "Something went wrong while confirming your password",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

export default User;
