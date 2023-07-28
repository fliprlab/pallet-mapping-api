import LocationItemsModel from "../../models/LocationItemsModel";

export const getDuplicateItems = async () => {
  return await LocationItemsModel.aggregate([
    {
      $group: {
        _id: "$itemId",
        items: {
          $push: "$$ROOT",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $match: {
        count: {
          $gt: 1,
        },
      },
    },
  ]);
};
