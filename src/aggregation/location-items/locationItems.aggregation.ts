import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";

export const getLocationItemsAggregation = (
  _params: TRouteParams
): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const req = _params.req;

  const status = req.query.status;
  const date = req.query.date as unknown as [null, null] | null;

  if (req.query.search) {
    const SearchRegex = new RegExp(req.query.search as string, "i");
    aggr.push({
      $match: {
        $or: [
          { itemId: SearchRegex },
          { destination: SearchRegex },
          { zone: SearchRegex },
          { lpst: SearchRegex },
          { "pallet.name": SearchRegex },
        ],
      },
    });
  }
  if (status && status === "created") {
    aggr.push({
      $match: {
        status: "created",
        pallet: null,
      },
    });
  } else if (status === "bagged") {
    aggr.push({
      $match: {
        status: "picked up",
      },
    });
  } else if (status === "sort") {
    aggr.push({
      $match: {
        status: "created",
        pallet: { $ne: null },
      },
    });
  }

  if (date && date[0] && date[1]) {
    aggr.push({
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new Date(date[0]),
            },
          },
          {
            createdAt: {
              $lte: new Date(date[1]),
            },
          },
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
