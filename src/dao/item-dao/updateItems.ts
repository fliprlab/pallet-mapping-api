import { ObjectId } from "mongodb";
import IteModel from "../../models/ItemModel";
import { TItem } from "../../models/type/item";

interface IUpdate {
  shipmentId: ObjectId;
  data: Partial<TItem>;
}

export const updateItems = async ({ shipmentId, data }: IUpdate) => {
  return await IteModel.updateMany(
    { shipmentId },
    {
      $set: data,
    }
  ).exec();
};
