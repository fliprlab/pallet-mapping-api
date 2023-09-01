import { regExpCaseInsen } from "../../constants";
import GridModel from "../../models/GridModel";

export const findHubGrid = async (id: string, hub: string) => {
  return await GridModel.findOne({
    gridId: id,
    "hub.name": regExpCaseInsen(hub),
  }).exec();
};
