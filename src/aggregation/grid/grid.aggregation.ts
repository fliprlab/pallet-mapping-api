import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";
import { ObjectId } from "mongodb";

export const getGridsAggregation = (_params: TRouteParams): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { req, res } = _params;

  console.log("req.query", req.query);
  console.log("res.locals.origin", res.locals.origin);

  if (res.locals.origin) {
    aggr.push({
      $match: {
        "hub._id": new ObjectId(res.locals.origin._id),
      },
    });
  }

  // status Filter
  if (req.query.status && req.query.status !== "") {
    aggr.push({
      $match: {
        status: req.query.status,
      },
    });
  }

  // destination Filter
  if (req.query.destination && req.query.destination !== "") {
    aggr.push({
      $match: {
        destination: req.query.destination,
      },
    });
  }

  //   sort filter
  if (
    req.query.sortBy === "descending" ||
    req.query.sortBy === "" ||
    req.query.sortBy === undefined
  ) {
    aggr.push({
      $sort: {
        _id: -1,
      },
    });
  } else if (req.query.sortBy === "ascending") {
    aggr.push({
      $sort: {
        _id: 1,
      },
    });
  }

  return aggr;
};
