import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";

export const checkValidKiranaList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("name")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Enter a valid list name"),
    body("list").isArray({ min: 5 }).withMessage("minimum 5 item allowed"),
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
