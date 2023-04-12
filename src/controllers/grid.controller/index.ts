import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { JsonResponse } from "../../utils/jsonResponse";
import { gridDao } from "../../dao/grid-dao";
import { locationDao } from "../../dao/locations-dao";
import { createGrid } from "./createGrid";
import { getGrids } from "./getGrids";

export const gridController = {
  createGrid,
  getGrids,
};
