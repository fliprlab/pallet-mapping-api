import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";
import { ObjectId } from "mongodb";

export const getUsersAggregation = (_params: TRouteParams): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { req, res } = _params;

  if (res.locals.origin) {
    aggr.push({
      $match: {
        "origin._id": new ObjectId(res.locals.origin._id),
      },
    });
  }

  if (req.query.search) {
    const SearchRegex = new RegExp(req.query.search as string, "i");
    aggr.push({
      $match: {
        $or: [
          { userName: SearchRegex },
          { origin: SearchRegex },
          { "origin.origin": SearchRegex },
        ],
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
