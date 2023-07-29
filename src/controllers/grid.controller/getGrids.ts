import { Request, Response } from "express";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import GridModel from "../../models/GridModel";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import { getGridsAggregation } from "../../aggregation/grid/grid.aggregation";
import { getGridsLookup } from "../../aggregation/grid/getGridsLookup";
import { PipelineStage } from "mongoose";

export const getGrids = async (req: Request, res: Response) => {
  try {
    const { data, pageData } = await paginated({
      Model: GridModel,
      aggregationArray: getGridsAggregation({ req, res }),
      paging: {
        itemPerPage: req.query.itemPerPage as string,
        page: req.query.page as string,
      },
      afterPagination: getGridsLookup() as PipelineStage.FacetPipelineStage[],
    });

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Data Find Successfully",
      message: "Data Find Successfully",
      data: data,
      pageData: pageData,
    });
  } catch (error) {
    logger.error(error);
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: "Something went wrong please try again.",
    });
  }
};
