import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";
import { locationItemsDao } from ".";

export interface ICSVLocationItem {
  primary_key: string;
  shipment_destination_location_name: string;
  Zone: string;
  LPST: string;
}

export const createLocationItemDao = async (
  data: ICSVLocationItem & { hub: { _id: ObjectId; origin: String } }
) => {
  // check item is cancelled
  const findItem = await locationItemsDao.getLastLocationItem(data.primary_key);

  // if hub is same than cancell the item
  if (findItem) {
    if (data.hub.origin.toUpperCase() === findItem.hub?.origin.toUpperCase()) {
      await LocationItemsModel.findByIdAndUpdate(findItem.id, {
        $set: {
          cancelled: true,
        },
      });
    }
  }

  return await LocationItemsModel.create({
    destination: data.shipment_destination_location_name,
    lpst: data.LPST,
    itemId: data.primary_key,
    zone: data.Zone,
    hub: data.hub,
  });
};
