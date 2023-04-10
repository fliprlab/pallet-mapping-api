import { PipelineStage } from "mongoose";
import LocationModel from "../../models/LocationModel";

export const getLocations = async (aggregation: PipelineStage[]) => {
  return await LocationModel.aggregate(aggregation).exec();
};
