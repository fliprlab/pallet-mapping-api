import ShipmentsModel from "../../models/shipmentsModel";
import { TShipments } from "../../models/type/shipments";

export const addShipment = async (data: Partial<TShipments>) => {
  const inserted = new ShipmentsModel(data);
  return await inserted.save();
};
