import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";
import { REGX } from "../constants";

export const gridValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("gridId")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Grid Id required")
      .matches(REGX.GRID_ID)
      .withMessage("Enter a valid grid id."),
    body("location")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("location required"),
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
      message: errors.array()[0].error,
      data: errors.array(),
    });
  }
};
