import { PipelineStage } from "mongoose";

export const getGridsLookup = () => {
  const agger: PipelineStage[] = [];

  agger.push(
    {
      $lookup: {
        from: "pallets",
        localField: "palletId._id",
        foreignField: "_id",
        as: "pallet",
      },
    },
    {
      $unwind: {
        path: "$pallet",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "shipments",
        localField: "pallet.shipmentId",
        foreignField: "_id",
        as: "shipments",
      },
    },
    {
      $unwind: {
        path: "$shipments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        gridId: 1,
        palletId: 1,
        time: 1,
        status: 1,
        virtualId: "$shipments.virtualId",
        destination: 1,
        hub: 1,
      },
    }
  );

  return agger;
};
