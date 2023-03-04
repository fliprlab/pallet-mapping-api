import { PipelineStage } from "mongoose";

export const getPaginationAggregation = (
  page: string,
  itemPerPage: string
): PipelineStage[] => {
  let aggr: PipelineStage[] = [];

  if (
    page !== undefined &&
    itemPerPage !== undefined &&
    page !== "undefined" &&
    itemPerPage !== "undefined"
  ) {
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
