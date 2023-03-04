import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const updateUserDao = async (id: string, data: Partial<TUsers>) => {
  try {
    return await UsersModel.findByIdAndUpdate(id, {
      $set: data,
    }).exec();
  } catch (error) {
    logger.error(error);
  }
};
