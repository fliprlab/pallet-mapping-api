import LocationItemsModel from "../../models/LocationItemsModel";

interface ILocationItem {
  primary_key: string;
  shipment_destination_location_name: string;
  Zone: string;
  LPST: string;
}

export const createLocationItemDao = async (data: ILocationItem) => {
  return await LocationItemsModel.create({
    destination: data.shipment_destination_location_name,
    lpst: data.LPST,
    itemId: data.primary_key,
    zone: data.Zone,
  });
};
