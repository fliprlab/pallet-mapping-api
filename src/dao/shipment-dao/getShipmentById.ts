import { ObjectId } from "mongodb";
import ShipmentsModel from "../../models/shipmentsModel";

export const getShipmentById = async (id: string) => {
  const shipments = await ShipmentsModel.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ]);
  return shipments.length > 0 ? shipments[0] : null;
};
