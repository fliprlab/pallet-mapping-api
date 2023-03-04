import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const updateUserDao = async (id: string, data: Partial<TUsers>) => {
  try {
    const update = await UsersModel.findByIdAndUpdate(id, {
      $set: data,
    }).exec();
    return update;
  } catch (error) {
    logger.error(error);
  }
};
