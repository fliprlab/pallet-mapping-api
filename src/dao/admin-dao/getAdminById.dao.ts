import { logger } from "../../config/logger";
import AdminUserModel from "../../models/AdminModel";

export const getAdminById = async (userId: string) => {
  try {
    const admin = AdminUserModel.findById(userId).exec();
    return admin;
  } catch (error) {
    logger.error(error);
  }
};
