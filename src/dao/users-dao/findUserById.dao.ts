import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const findUserByIdDao = async (id: string) => {
  try {
    const user = await UsersModel.findById(id).exec();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
