import ApiError from "../utils/ApiError";

export const thorwValidationError = (error: any) => {
  let message = error.message || "Validation Error";
  throw ApiError.badRequest(message);
};
