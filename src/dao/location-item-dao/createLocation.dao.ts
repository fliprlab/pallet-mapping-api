import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

export interface ICSVLocationItem {
  primary_key: string;
  shipment_destination_location_name: string;
  Zone: string;
  LPST: string;
}

export const createLocationItemDao = async (
  data: ICSVLocationItem & { hub: { _id: ObjectId; origin: String } }
) => {
  return await LocationItemsModel.create({
    destination: data.shipment_destination_location_name,
    lpst: data.LPST,
    itemId: data.primary_key,
    zone: data.Zone,
    hub: data.hub,
  });
};
