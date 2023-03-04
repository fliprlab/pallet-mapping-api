import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const findUserByNameDao = async (userName: string) => {
  try {
    return await UsersModel.findOne({
      userName: userName.toLowerCase(),
    }).exec();
  } catch (error) {
    logger.error(error);
  }
};
