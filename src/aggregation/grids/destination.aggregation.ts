import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";
import { ObjectId } from "mongodb";

export const getAllDestinationsAggregation = (
  _params: TRouteParams
): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { res } = _params;
  aggr.push({
    $match: {
      "hub._id": new ObjectId(res.locals.origin._id),
      status: "occupied",
    },
  });
  aggr.push({
    $group: {
      _id: "$destination",
      occupiedGrids: {
        $count: {},
      },
    },
  });

  return aggr;
};
