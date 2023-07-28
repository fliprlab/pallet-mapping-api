import { Request, Response } from "express";
import { PipelineStage } from "mongoose";
import { regExpLocation } from "../../constants";

export const getPickUpItemAggregation = (
  req: Request,
  res: Response
): PipelineStage[] => {
  const { origin } = res.locals;
  const { locations } = req.body;
  const aggr: PipelineStage[] = [];

  aggr.push(
    {
      $match: {
        latestStatus: "asign-grid",
        shipmentDestination: {
          $in: locations,
        },
        shipmentOrigin: origin,
      },
    },
    {
      $lookup: {
        from: "grids",
        localField: "gridId",
        foreignField: "_id",
        as: "grid",
      },
    },
    {
      $unwind: {
        path: "$grid",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: -1,
        gridId: "$grid.gridId",
        shipmentId: 1,
        palletId: 1,
        virtualId: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    }
  );

  return aggr;
};
