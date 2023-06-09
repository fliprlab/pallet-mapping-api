import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { errorFormatter } from "../../utils/error-formatter";
import { JsonResponse } from "../../utils/jsonResponse";
import { REGX } from "../../constants";

export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body("location")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("location required"),
    // .isAlphanumeric()
    // .withMessage("Enter a valid location"),
    body("palletId")
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage("Pallet Id required")
      .matches(REGX.PALLET_ID)
      .withMessage("Enter a valid pallet id."),
    body("items")
      .isArray()
      .withMessage("Items required.")
      .isAlphanumeric()
      .withMessage("Enter a valid items.")
      .custom((e) => {
        return e.every((a: string) => {
          return REGX.PALLET_ITEMS.test(a);
        });
      })
      .withMessage("Enter a valid items."),
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
