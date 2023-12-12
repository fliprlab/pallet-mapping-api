import ShipmentsModel from "../../models/shipmentsModel";

export const getLastShipment = async () => {
  return await ShipmentsModel.aggregate([
    { $sort: { _id: -1 } },
    { $limit: 1 },
  ]);
};
