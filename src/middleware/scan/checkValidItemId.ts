import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../../utils/error-formatter";
import { JsonResponse } from "../../utils/jsonResponse";
import { REGX } from "../../constants";

export const checkValidItemId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("scan")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Item id required")
      .matches(REGX.PALLET_ITEMS)
      .withMessage("Enter a valid item id"),
  ];

  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req).formatWith(errorFormatter);

  if (errors.isEmpty()) {
    next();
  } else {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "Invalid Item Id",
      message: errors.array()[0].error,
      data: errors.array(),
    });
  }
};
