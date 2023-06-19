import { addGrid } from "./addGrid";
import { upsertGrids } from "./upsertGrids";
import { findByGridId } from "./findByGridId";
import { findGridById } from "./findGridById";
import { updateGrid } from "./updateGrid";

export const gridDao = {
  addGrid,
  findByGridId,
  updateGrid,
  findGridById,
  upsertGrids,
};
