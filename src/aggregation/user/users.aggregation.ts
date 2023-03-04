import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";

export const getUsersAggregation = (_params: TRouteParams): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const req = _params.req;

  if (req.query.search) {
    const SearchRegex = new RegExp(req.query.search as string, "i");
    aggr.push({
      $match: {
        $or: [{ userName: SearchRegex }, { origin: SearchRegex }],
      },
    });
  }

  aggr.push({
    $sort: {
      _id: -1,
    },
  });

  return aggr;
};
