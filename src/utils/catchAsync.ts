import { RouteMiddleware } from "../middlewares/types";
import ApiError from "./ApiError";

const catchAsync =
  (fn: RouteMiddleware): RouteMiddleware =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        return next(ApiError.internal());
      }
      return next(error);
    }
  };

export default catchAsync;
