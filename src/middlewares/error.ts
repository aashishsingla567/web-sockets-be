import { ErrorMiddleware } from "./types";
import { NextFunction, Request, Response } from "express";

import ApiError from "../utils/ApiError";

export const errorConverter: ErrorMiddleware<typeof ApiError> = (
  err: TError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err?.status) {
    throw ApiError.internal();
  }
};

export const errorHandler: ErrorMiddleware<typeof ApiError> = (
  err: typeof ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err;

  res.status(status).send({
    status,
    message,
  });
};
