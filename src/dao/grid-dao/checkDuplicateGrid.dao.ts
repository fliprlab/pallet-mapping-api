import { ObjectId } from "mongodb";
import GridModel from "../../models/GridModel";

export const checkDuplicateGridDao = async (data: {
  gridId: string;
  hub: {
    _id: ObjectId;
    name: string;
  };
}) => {
  const { gridId, hub } = data;
  return await GridModel.findOne({
    gridId: gridId,
    hub: { _id: hub._id, name: hub.name },
  }).exec();
};
