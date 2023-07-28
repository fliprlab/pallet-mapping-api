import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";
import { regExpLocation } from "../../constants";

export const getLocationPalletsAggregation = (
  _params: TRouteParams
): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { req } = _params;

  aggr.push({
    $match: {
      shipmentDestination: regExpLocation(req.body.destination),
      latestStatus: "created",
    },
  });

  aggr.push({
    $group: {
      _id: "$palletId",
    },
  });

  aggr.push({
    $sort: {
      _id: -1,
    },
  });

  return aggr;
};
