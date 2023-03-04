import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const addUserDao = async (data: TUsers) => {
  try {
    const inserted = new UsersModel(data);
    return await inserted.save();
  } catch (error) {
    logger.error(error);
  }
};
