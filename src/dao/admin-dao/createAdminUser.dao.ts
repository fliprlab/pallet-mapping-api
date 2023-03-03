import { logger } from "../../config/logger";
import AdminUserModel from "../../models/AdminModel";

export const createAdminUserDao = async (data: Partial<TAdminUser>) => {
  try {
    const inserted = new AdminUserModel(data);
    const user = inserted.save();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
