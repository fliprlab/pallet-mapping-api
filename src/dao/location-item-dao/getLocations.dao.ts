import { ObjectId } from "mongodb";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationItemsModel from "../../models/LocationItemsModel";

import { PipelineStage } from "mongoose";

interface IGetLocationItemsParams {
  status: "created" | "bagged" | "sort";
  date: [Date, Date];
  search: string;
  hub: {
    _id: ObjectId;
    origin: string;
  };
}

const getLocationItemsAggregation = (
  params: IGetLocationItemsParams
): PipelineStage[] => {
  const { date, search, status, hub } = params;
  const aggr: PipelineStage[] = [];

  aggr.push({
    $match: {
      hub: hub,
    },
  });

  if (search) {
    const SearchRegex = new RegExp(search, "i");
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
        status: "put away",
      },
    });
  } else if (status === "sort") {
    aggr.push({
      $match: {
        status: "created",
        pallet: { $ne: null },
      },
    });
  } else if (status) {
    aggr.push({
      $match: {
        status: status,
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

export const getLocationItemsDao = async (
  paging: { page: string; itemPerPage: string },
  params: IGetLocationItemsParams
) => {
  return await paginated({
    Model: LocationItemsModel,
    aggregationArray: getLocationItemsAggregation(params),
    paging: paging,
  });
};
