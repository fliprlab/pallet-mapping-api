import { Request } from "express";
import { Model, PipelineStage } from "mongoose";

import { getPaginationAggregation } from "../../aggregation/pagination/pagination.aggregation";

interface IPaginated {
  req: Request;
  Model: Model<any>;
  aggregationArray: PipelineStage[];
}

export const paginated = async (props: IPaginated) => {
  const { Model, req, aggregationArray } = props;
  const paginationAggregation = getPaginationAggregation(
    req.query.page,
    req.query.itemPerPage
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

  return results;
};
