import { regExpZone } from "../../constants";
import ZoneModel from "../../models/ZoneModel";

export const findZone = async (zone: string) => {
  return await ZoneModel.findOne({
    zone: regExpZone(zone),
  }).exec();
};
