import { paginated } from "../../middleware/paginate/paginated.middleware";
import { PipelineStage } from "mongoose";
import PalletModel from "../../models/PalletModel";

interface IFilterParams {
  status: "pallet-created" | "pallet-asign-grid" | "pallet-out";
  search: string;
  paging: { page: string; itemPerPage: string };
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
          { hub: SearchRegex },
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

export const getPalletsDao = async (params: IFilterParams) => {
  return await paginated({
    Model: PalletModel,
    aggregationArray: getPalletsAggregation(params),
    paging: params.paging,
  });
};
