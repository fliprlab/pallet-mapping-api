import { addItems } from "./addItems";
import { deleteItemById } from "./deleteItemById";
import { getAllItems } from "./getAllItems";
import { getDuplicateItems } from "./getDuplicateItems";
import { updateItems } from "./updateItems";

export const ItemDao = {
  addItems,
  updateItems,
  getAllItems,
  getDuplicateItems,
  deleteItemById,
};
