import { logger } from "../../config/logger";
import AdminUserModel from "../../models/AdminModel";

export const getAdminByEmail = async (username: string) => {
  try {
    const email = new RegExp("^" + username, "i");
    const admin = AdminUserModel.findOne({ username: email }).exec();
    return admin;
  } catch (error) {
    logger.error(error);
  }
};
