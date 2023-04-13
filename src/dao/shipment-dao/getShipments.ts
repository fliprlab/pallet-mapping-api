import { PipelineStage } from "mongoose";
import ShipmentsModel from "../../models/shipmentsModel";

export const getShipments = async (aggregation: PipelineStage[]) => {
  return ShipmentsModel.aggregate(aggregation).exec();
};
