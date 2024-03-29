import { PipelineStage } from "mongoose";
import { TRouteParams } from "../../types/Express";
import { ObjectId } from "mongodb";

export const getGridsAggregation = (_params: TRouteParams): PipelineStage[] => {
  const aggr: PipelineStage[] = [];
  const { req, res } = _params;

  if (res.locals.origin) {
    aggr.push({
      $match: {
        "hub._id": new ObjectId(res.locals.origin._id),
      },
    });
  }

  // Search Filter

  if (req.query.search) {
    const SearchRegex = new RegExp(req.query.search as string, "i");
    aggr.push({
      $match: {
        $or: [{ gridId: SearchRegex }, { "palletId.name": SearchRegex }],
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
        status: "occupied",
        destination: req.query.destination,
      },
    });
  }
  // active filter

  if (req.query.inactive && req.query.inactive === "in-active") {
    aggr.push({
      $match: {
        active: false,
      },
    });
  } else {
    aggr.push({
      $match: {
        $or: [{ active: true }, { active: null }],
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
