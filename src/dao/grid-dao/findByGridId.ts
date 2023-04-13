import GridModel from "../../models/GridModel";

export const findByGridId = async (id: string) => {
  return await GridModel.findOne({ gridId: id }).exec();
};
