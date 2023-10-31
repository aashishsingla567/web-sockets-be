import httpStatus from "http-status";

import config from "../config";
import { addApostropheS } from "./string";

const DEFAULT_MESSAGES = {
  [httpStatus.BAD_REQUEST]: "Bad Request",
  [httpStatus.UNAUTHORIZED]: "Unauthorized",
  [httpStatus.FORBIDDEN]: "Forbidden",
  [httpStatus.NOT_FOUND]: "Not Found",
  [httpStatus.CONFLICT]: "Conflict",
  [httpStatus.INTERNAL_SERVER_ERROR]: `Something went wrong at ${addApostropheS(
    config.project_name
  )} server. Please try again later`,
  [httpStatus.SERVICE_UNAVAILABLE]: "Service Unavailable",
  [httpStatus.REQUEST_TIMEOUT]: "Request Timeout",
} as const;

class ApiError extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
    if (!status) {
      const m_msg = message ?? DEFAULT_MESSAGES[500];
      return ApiError.internal(m_msg);
    }
  }

  static badRequest(message: string = DEFAULT_MESSAGES[400]) {
    return new ApiError(message, httpStatus.BAD_REQUEST);
  }

  static unauthorized(message: string = DEFAULT_MESSAGES[401]) {
    return new ApiError(message, httpStatus.UNAUTHORIZED);
  }

  static forbidden(message: string = DEFAULT_MESSAGES[403]) {
    return new ApiError(message, httpStatus.FORBIDDEN);
  }

  static notFound(message: string = DEFAULT_MESSAGES[404]) {
    return new ApiError(message, httpStatus.NOT_FOUND);
  }

  static conflict(message: string = DEFAULT_MESSAGES[409]) {
    return new ApiError(message, httpStatus.CONFLICT);
  }

  static internal(message: string = DEFAULT_MESSAGES[500]) {
    return new ApiError(message, httpStatus.INTERNAL_SERVER_ERROR);
  }

  // request timeout
  static timeout(message: string = DEFAULT_MESSAGES[408]) {
    return new ApiError(message, httpStatus.REQUEST_TIMEOUT);
  }

  // schema validation error
  static schema(message: string = DEFAULT_MESSAGES[400]) {
    return new ApiError(message, httpStatus.BAD_REQUEST);
  }

  static serviceUnavailable(message: string = DEFAULT_MESSAGES[503]) {
    return new ApiError(message, httpStatus.SERVICE_UNAVAILABLE);
  }
}

export default ApiError;
