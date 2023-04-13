import ShipmentsModel from "../../models/shipmentsModel";
import { TShipments } from "../../models/type/shipments";

export const updateShipment = async (
  _id: string,
  data: Partial<TShipments>,
  status?: TShipments["status"][0]
) => {
  return await ShipmentsModel.updateOne(
    { _id },
    {
      $set: data,
      $push: {
        status: status,
      },
    }
  ).exec();
};
