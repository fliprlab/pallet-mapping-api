import jwt from "jsonwebtoken";
import moment from "moment";
import { logger } from "../../config/logger";
import TokenModel from "../../models/TokenModel";

export const generateTokenHub = async (data: any) => {
  try {
    const tokenValue = jwt.sign(
      {
        data: {
          userId: data._id,
          username: data.username ?? data.name,
          origin: data.origin,
        },
      },
      process.env.jwtSecret ?? "",
      { expiresIn: "1days" }
    );

    const expiresIn = moment().add(1, "day");

    const Token = new TokenModel({
      userId: data._id,
      role: data.role,
      token: tokenValue,
      expiryDate: expiresIn,
      origin: data.origin._id,
    });
    const inserted = await Token.save();
    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
