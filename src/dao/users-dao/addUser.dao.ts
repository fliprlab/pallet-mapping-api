import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";
import { TUsers } from "../../models/type/users";

export const addUserDao = async (data: TUsers) => {
  try {
    const inserted = new UsersModel(data);
    return await inserted.save();
  } catch (error) {
    logger.error(error);
  }
};
