import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const getUserByUsername = async (username: string) => {
  try {
    return await UsersModel.findOne({
      userName: username.toLowerCase(),
    }).exec();
  } catch (error) {
    logger.error(error);
  }
};
