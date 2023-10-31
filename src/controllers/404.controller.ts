import httpStatus from "http-status";

import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const handle404 = (response = "Not found") =>
  catchAsync(async () => {
    throw new ApiError(response, httpStatus.NOT_FOUND);
  });

export default handle404;
