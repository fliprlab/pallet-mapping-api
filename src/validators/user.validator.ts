import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";

export const usersValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("name")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("name required")
      .isLength({ min: 2 })
      .withMessage("minimum 2 character required")
      .isString()
      .withMessage("enter valid name"),
    body("password")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required")

      .withMessage("enter valid name"),
    body("mobile")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required"),
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

export const userLoginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("email")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required")
      .isEmail()
      .withMessage("enter valid email"),
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

export const usersSignupValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("name")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("name required")
      .isLength({ min: 2 })
      .withMessage("minimum 2 character required")
      .isString()
      .withMessage("enter valid name"),
    body("password")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required"),

    body("mobile")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required"),
    body("email")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("field is required")
      .isEmail()
      .withMessage("enter valid email"),
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
