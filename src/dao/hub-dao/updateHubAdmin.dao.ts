import { FilterQuery } from "mongoose";
import { logger } from "../../config/logger";
import { THubAdmin } from "../../models/type/hubAdmin.";
import HubAdminModel from "../../models/HubAdminModel";

interface IUpdate {
  where: FilterQuery<THubAdmin>;
  data: Partial<THubAdmin>;
  upsert?: boolean;
}

export const updateHubAdminDao = async (fields: IUpdate) => {
  const { data, where, upsert = false } = fields;
  try {
    const user = await HubAdminModel.updateOne(
      { ...where },
      { $set: data },
      { upsert: upsert }
    ).exec();
    return user;
  } catch (error) {
    logger.error(error);
  }
};
