import { Request } from "express";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import LocationItemsModel from "../../models/LocationItemsModel";

import { PipelineStage } from "mongoose";

interface IGetLocationItemsParams {
  status: "created" | "bagged" | "sort";
  date: [Date, Date];
  search: string;
}

const getLocationItemsAggregation = (
  params: IGetLocationItemsParams
): PipelineStage[] => {
  const { date, search, status } = params;
  const aggr: PipelineStage[] = [];

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

export const getLocationItemsDao = async (
  req: Request,
  params: IGetLocationItemsParams
) => {
  return await paginated({
    Model: LocationItemsModel,
    aggregationArray: getLocationItemsAggregation(params),
    paging: {
      itemPerPage: req.query.itemPerPage as string,
      page: req.query.page as string,
    },
  });
};
