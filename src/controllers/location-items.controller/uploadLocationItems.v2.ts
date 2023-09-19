import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import fs from "fs";
import csvParser from "csv-parser";

import { checkDuplicateLocationItemDao } from "../../dao/location-item-dao/checkDuplicateLocationItem.dao";
import { TLocationItems } from "../../models/type/location-items";
import { checkInvalidLocationDao } from "../../dao/location-item-dao/checkInvalidLocation.dao";
import { REGX } from "../../constants";
import {
  ICSVLocationItem,
  createLocationItemDao,
} from "../../dao/location-item-dao/createLocation.dao";
import { io } from "../../app";
import { ObjectId } from "mongodb";

const BATCH_COUNT = 200;

type TInvalidItems = {
  invalidLocation: TLocationItems[];
  duplicateEntries: TLocationItems[];
  inserted: TLocationItems[];
  invalidEntries: TLocationItems[];
};

const getCsvRowCount = async (fileDir: string) => {
  try {
    const fileContent = await fs.promises.readFile(fileDir, "utf-8");
    const lineCount = fileContent.trim().split("\n").length;
    return lineCount - 1;
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }
};

const processCsvLine = async (
  data: ICSVLocationItem,
  hub: { _id: ObjectId; origin: string },
  uploadItems: TInvalidItems
) => {
  const location = await checkInvalidLocationDao(
    data.shipment_destination_location_name
  );
  if (!location) {
    uploadItems.invalidLocation.push({
      destination: data.shipment_destination_location_name,
      itemId: data.primary_key,
      lpst: data.LPST,
      zone: data.Zone,
      reason: "Location Not Available",
    });
  } else {
    const duplicate = await checkDuplicateLocationItemDao(data.primary_key, {
      destination: data.shipment_destination_location_name,
      hub: hub.origin,
    });
    if (duplicate) {
      uploadItems.duplicateEntries.push({
        destination: data.shipment_destination_location_name,
        itemId: data.primary_key,
        lpst: data.LPST,
        zone: data.Zone,
        reason: "Duplicate items",
      });
    } else if (
      data.shipment_destination_location_name.toUpperCase() ===
      hub.origin.toUpperCase()
    ) {
      uploadItems.invalidEntries.push({
        destination: data.shipment_destination_location_name,
        itemId: data.primary_key,
        lpst: data.LPST,
        zone: data.Zone,
        reason: "Source & Destination is same",
      });
    } else if (!REGX.LPST.test(data.LPST)) {
      uploadItems.invalidEntries.push({
        destination: data.shipment_destination_location_name,
        itemId: data.primary_key,
        lpst: data.LPST,
        zone: data.Zone,
        reason: "Incorrect LPST",
      });
    } else if (!REGX.PALLET_ITEMS.test(data.primary_key)) {
      uploadItems.invalidEntries.push({
        destination: data.shipment_destination_location_name,
        itemId: data.primary_key,
        lpst: data.LPST,
        zone: data.Zone,
        reason: "In-valid item name",
      });
    } else {
      const inserted = await createLocationItemDao({ ...data, hub: hub });
      uploadItems.inserted.push(inserted);
    }
  }
};

const processRow = async (
  item: any,
  origin: any,
  uploadItems: any,
  totalRows: number,
  process: any
) => {
  await processCsvLine(item, origin, uploadItems);
  process.processedRows++;
};

const startUploadProcess = async (filePath: string, origin: string) => {
  const uploadItems: TInvalidItems = {
    invalidLocation: [],
    duplicateEntries: [],
    inserted: [],
    invalidEntries: [],
  };
  const process = {
    processedRows: 0,
  };

  console.log("Process Start");
  const count = await getCsvRowCount(filePath);
  console.log("Total Rows", count);

  const totalRows = count ?? 0;

  const dataBatch: any[] = [];
  let rowCount = 0;

  const stream = fs.createReadStream(filePath).pipe(csvParser());

  for await (const csvLine of stream) {
    dataBatch.push(csvLine);
    rowCount++;
    if (dataBatch.length >= BATCH_COUNT) {
      console.log("Batch Pushed ", rowCount);
      await Promise.all(
        dataBatch.map(async (item) => {
          return new Promise((resolve, reject) => {
            processRow(item, origin, uploadItems, totalRows, process)
              .then((res) => resolve(res))
              .catch(reject);
          });
        })
      );
      const percentage = Math.round((process.processedRows / totalRows) * 100);
      io.emit("progress", {
        percentage,
        uploadItems,
      });
      console.log("processedRows", process.processedRows);
      console.log("Batch Finish ", rowCount);
      dataBatch.length = 0;
    }
  }

  if (dataBatch.length > 0) {
    console.log("Batch Pushed Last", rowCount);
    await Promise.all(
      dataBatch.map(async (item) => {
        return new Promise((resolve, reject) => {
          processRow(item, origin, uploadItems, totalRows, process)
            .then((res) => resolve(res))
            .catch(reject);
        });
      })
    );
    const percentage = Math.round((process.processedRows / totalRows) * 100);
    io.emit("progress", {
      percentage,
      uploadItems,
    });
    console.log("processedRows", process.processedRows);
    console.log("Batch Finish Last", rowCount);
  }

  fs.unlinkSync(filePath); // Delete the temporary uploaded file
};

export const uploadLocationItemV2 = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const filePath = `./uploads/${file?.originalname}`;
    const { origin } = res.locals;

    startUploadProcess(filePath, origin);

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Items upload started",
      message: "Item is uploading",
      data: [],
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
