import LocationModel from "../../models/LocationModel";
import { TLocation } from "../../models/type/location";

export const addLocation = async (data: TLocation) => {
  const inserted = new LocationModel(data);
  return await inserted.save();
};
