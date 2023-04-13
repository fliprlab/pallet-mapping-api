import ShipmentsModel from "../../models/shipmentsModel";

export const getShipmentById = async (id: string) => {
  return await ShipmentsModel.findById(id).exec();
};
