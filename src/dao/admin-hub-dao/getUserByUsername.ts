import { logger } from "../../config/logger";
import HubAdminModel from "../../models/HubAdminModel";

export const getUserByUsername = async (username: string) => {
  try {
    return await HubAdminModel.findOne({
      username: username.toLowerCase(),
    }).exec();
  } catch (error) {
    logger.error(error);
  }
};
