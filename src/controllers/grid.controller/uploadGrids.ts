import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import fs from "fs";
import csvParser from "csv-parser";

import { checkInvalidLocationDao } from "../../dao/location-item-dao/checkInvalidLocation.dao";
import { REGX } from "../../constants";

import { io } from "../../app";

import { TGrid } from "../../models/type/grid";
import { gridDao } from "../../dao/grid-dao";

let invalidLocation: TGrid[] = [];
let duplicateEntries: TGrid[] = [];
let validEntries: TGrid[] = [];
let invalidEntries: TGrid[] = [];

interface ICSVGrid {
  gridId: string;
  hub: string;
}

const getCsvRowCount = async (fileDir: string) => {
  try {
    const fileContent = await fs.promises.readFile(fileDir, "utf-8");
    const lineCount = fileContent.trim().split("\n").length;
    return lineCount - 1;
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }
};

const processCsvLine = async (data: ICSVGrid) => {
  try {
    const location = await checkInvalidLocationDao(data.hub);
    if (!location) {
      invalidLocation.push({
        reason: "Location Not Available",
        gridId: data.hub,
        hub: {
          _id: null,
          name: data.hub,
        },
      });
    } else {
      const duplicate = await gridDao.checkDuplicateGridDao({
        gridId: data.gridId,
        hub: {
          _id: location._id,
          name: location.location,
        },
      });
      if (duplicate) {
        duplicateEntries.push({
          gridId: data.gridId,
          hub: {
            _id: location._id,
            name: location.location,
          },
          reason: "Duplicate Grids",
        });
      } else if (!REGX.GRID_ID.test(data.gridId)) {
        invalidEntries.push({
          gridId: data.gridId,
          hub: {
            _id: location._id,
            name: location.location,
          },
          reason: "Incorrect Grid Id",
        });
      } else {
        const inserted = await gridDao.addGrid({
          gridId: data.gridId,
          hub: { _id: location._id, name: location.location },
        });
        validEntries.push(inserted);
      }
    }
  } catch (error) {
    console.error("Error processing CSV line:", error);
  }
};

export const uploadGrids = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const filePath = `./uploads/${file?.originalname}`;
    invalidLocation = [];
    duplicateEntries = [];
    validEntries = [];
    invalidEntries = [];

    const readStream = fs.createReadStream(filePath);

    const count = await getCsvRowCount(filePath);

    const totalRows = count ?? 0;
    let processedRows = 0;

    for await (const csvLine of readStream.pipe(csvParser())) {
      await processCsvLine(csvLine);
      processedRows++;
      const percentage = Math.round((processedRows / totalRows) * 100);
      io.emit("grid-progress", percentage);
    }

    fs.unlinkSync(filePath); // Delete the temporary uploaded file

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Grid uploaded",
      message: "Grid uploaded Successfully",
      data: {
        invalidLocation,
        duplicateEntries,
        inserted: validEntries,
        invalidEntries,
      },
    });
  } catch (error: any) {
    logger.error(error);

    if (String(error.message).search("E11000") === 0) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Duplicate items",
        message: "Duplicate items found",
      });
    }
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Server Error",
      message: error.message,
    });
  }
};
