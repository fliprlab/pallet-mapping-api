import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const addUserDao = async (data: TUsers) => {
  try {
    const inserted = new UsersModel(data);
    const user = await inserted.save();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
