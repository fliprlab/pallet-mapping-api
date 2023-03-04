import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const findUserByNameDao = async (userName: string) => {
  try {
    const user = await UsersModel.findOne({
      userName: userName.toLowerCase(),
    }).exec();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
