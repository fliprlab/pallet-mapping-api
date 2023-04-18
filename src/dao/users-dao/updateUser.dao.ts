import { FilterQuery } from "mongoose";
import { logger } from "../../config/logger";
import UsersModel from "../../models/UsersModel";
import { TUsers } from "../../models/type/users";

interface IUpdate {
  where: FilterQuery<TUsers>;
  data: Partial<TUsers>;
  upsert?: boolean;
}

export const updateUserDao = async (fields: IUpdate) => {
  const { data, where, upsert = false } = fields;
  try {
    return await UsersModel.updateOne(
      { ...where },
      { $set: data },
      { upsert: upsert }
    ).exec();
  } catch (error) {
    logger.error(error);
  }
};
