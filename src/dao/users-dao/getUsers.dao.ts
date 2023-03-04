import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const getUsersDao = async () => {
  try {
    const users = await UsersModel.find({}).sort({ createdAt: -1 }).exec();
    return users;
  } catch (error) {
    logger.error(error);
  }
};
