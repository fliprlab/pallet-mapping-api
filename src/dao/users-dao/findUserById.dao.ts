import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const findUserByIdDao = async (id: string) => {
  try {
    return await UsersModel.findById(id).exec();
  } catch (error) {
    logger.error(error);
  }
};
