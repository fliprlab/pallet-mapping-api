import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";

export const getUsersDao = async () => {
  try {
    return await UsersModel.find({}).sort({ createdAt: -1 }).exec();
  } catch (error) {
    logger.error(error);
  }
};
