import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";

export const getItemAggregation = (_params: TRouteParams): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { req, res } = _params;
  const { origin } = res.locals;

  aggr.push({
    $match: {
      origin: origin.origin,
    },
  });

  if (req.query.status && req.query.status !== "all") {
    aggr.push({
      $match: {
        status: req.query.status,
      },
    });
  }

  // Search Filter

  if (req.query.search) {
    const SearchRegex = new RegExp(req.query.search as string, "i");
    aggr.push({
      $match: {
        $or: [
          { itemId: SearchRegex },
          { "pallet.name": SearchRegex },
          { "grid.name": SearchRegex },
          { virtualId: SearchRegex },
          { origin: SearchRegex },
          { destination: SearchRegex },
        ],
      },
    });
  }

  aggr.push({
    $sort: {
      lastUpdatedAt: -1,
    },
  });

  return aggr;
};
