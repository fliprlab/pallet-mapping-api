import ZoneModel from "../../models/ZoneModel";
import { TZone } from "../../models/type/TZone";

export const addZone = async (data: TZone) => {
  const inserted = new ZoneModel(data);
  return await inserted.save();
};
