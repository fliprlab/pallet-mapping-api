import { Request } from "express";
import { Model, PipelineStage } from "mongoose";

import { getPaginationAggregation } from "../../aggregation/pagination/pagination.aggregation";

interface IPaginated {
  req: Request;
  Model: Model<any>;
  aggregationArray: PipelineStage[];
  afterPagination?: PipelineStage.FacetPipelineStage[];
}

export const paginated = async (
  props: IPaginated
): Promise<{ data: any[]; pageData: any }> => {
  const { Model, req, aggregationArray, afterPagination } = props;

  const paginationAggregation = getPaginationAggregation(
    req.query.page,
    req.query.itemPerPage,
    afterPagination
  );
  const aggregateQuery: PipelineStage[] = [
    ...aggregationArray,
    ...paginationAggregation,
  ];

  let results: any[] = [];

  if (aggregateQuery.length > 0) {
    results = await Model.aggregate(aggregateQuery).exec();
  } else {
    results = await Model.find({}).exec();
  }

  if (results.length == 0) {
    return {
      data: [],
      pageData: undefined,
    };
  }

  return {
    data: results[0].data ? results[0].data : results,
    pageData: results[0].pageData,
  };
};
