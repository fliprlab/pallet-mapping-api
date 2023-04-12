import { PipelineStage } from "mongoose";

export const getPaginationAggregation = (
  page: any,
  itemPerPage: any
): PipelineStage[] => {
  let aggr: PipelineStage[] = [];

  if (page && itemPerPage) {
    const offset = Number(itemPerPage) * (Number(page) - 1);
    // bunch data
    aggr.push({
      $facet: {
        data: [
          {
            $skip: offset,
          },
          {
            $limit: Number(itemPerPage),
          },
        ],
        pageData: [
          {
            $count: "total",
          },
        ],
      },
    });

    // Unwind Page Data
    aggr.push({
      $unwind: {
        path: "$pageData",
        preserveNullAndEmptyArrays: true,
      },
    });
  }

  return aggr;
};
