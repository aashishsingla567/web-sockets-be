import type { Document } from "mongoose";
import Token from "../models/tokens.model";
import User from "../models/users.model";

import { TOKENS } from "../config";

type UserDoc = typeof User & Document;

// make access token
export const createAccessToken = async (user: UserDoc) => {
  const accessToken = await Token.create({
    user: user._id,
    type: "access",
    expiresAt: new Date(Date.now() + TOKENS.EXPIRY.ACCESS),
  });
  return accessToken;
};

// make refresh token
export const createRefreshToken = async (user: UserDoc) => {
  const refreshToken = await Token.create({
    user: user._id,
    type: "refresh",
    expiresAt: new Date(Date.now() + TOKENS.EXPIRY.REFRESH),
  });
  return refreshToken;
};
