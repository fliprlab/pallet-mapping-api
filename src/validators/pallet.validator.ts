import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../utils/error-formatter";
import { JsonResponse } from "../utils/jsonResponse";

export const palletValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("palletId")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Pallet id required")
      .isAlphanumeric()
      .withMessage("Enter a valid pallet id"),
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
