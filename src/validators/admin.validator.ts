import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("username", "Field is required").withMessage("Enter a valid username"),
    body("password", "Field is required")
      .isLength({ min: 8 })
      .withMessage("must be at least 8 chars long"),
  ];

  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req).formatWith(errorFormatter);

  if (errors.isEmpty()) {
    next();
  } else {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "Missing required fields",
      message: "All Fields are required",
      data: errors.array(),
    });
  }
};
