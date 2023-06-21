import IteModel from "../../models/ItemModel";
import { TItem } from "../../models/type/item";

export const addItems = async (data: Partial<TItem>[]) => {
  return await IteModel.insertMany(data);
};
