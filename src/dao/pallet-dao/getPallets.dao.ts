import { Request } from "express";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import { PipelineStage } from "mongoose";
import PalletModel from "../../models/PalletModel";

interface IFilterParams {
  status: "pallet-created" | "pallet-asign-grid" | "pallet-out";
  date: [Date, Date];
  search: string;
}

const getPalletsAggregation = (params: IFilterParams): PipelineStage[] => {
  const { search, status } = params;
  const aggr: PipelineStage[] = [];

  if (search) {
    const SearchRegex = new RegExp(search, "i");
    aggr.push({
      $match: {
        $or: [
          { palletId: SearchRegex },
          { destination: SearchRegex },
          { zone: SearchRegex },
          { lpst: SearchRegex },
          { "pallet.name": SearchRegex },
        ],
      },
    });
  }

  if (status) {
    aggr.push({
      $match: {
        status: status,
      },
    });
  }
  aggr.push({
    $sort: {
      palletId: 1,
    },
  });

  return aggr;
};

export const getPalletsDao = async (req: Request, params: IFilterParams) => {
  return await paginated({
    Model: PalletModel,
    aggregationArray: getPalletsAggregation(params),
    paging: {
      itemPerPage: req.query.itemPerPage as string,
      page: req.query.page as string,
    },
  });
};
