import { logger } from "../../config/logger";
import HubAdminModel from "../../models/HubAdminModel";
import { THubAdmin } from "../../models/type/hubAdmin.";

export const createHubAdminDao = async (data: Partial<THubAdmin>) => {
  try {
    const inserted = new HubAdminModel(data);
    const user = inserted.save();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
