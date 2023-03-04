import { Request } from "express";
import { Model, PipelineStage } from "mongoose";
import { getPaginationAggregation } from "../../aggregation/pagination/pagination.aggregation";

interface IPaginated {
  req: Request;
  Model: Model<any>;
  aggregationArray: PipelineStage[];
}

export const paginated = async (
  props: IPaginated
): Promise<{
  data: {
    [key: string]: any;
  }[];
  pageData?: {
    [key: string]: any;
  }[];
}> => {
  const { Model, req, aggregationArray } = props;
  const paginationAggregation = getPaginationAggregation(
    req.query.page as string,
    req.query.itemPerPage as string
  );
  const aggregateQuery: PipelineStage[] = [
    ...aggregationArray,
    ...paginationAggregation,
  ];

  let results = [];

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
