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

let invalidLocation: TLocationItems[] = [];
let duplicateEntries: TLocationItems[] = [];
let validEntries: TLocationItems[] = [];
let invalidEntries: TLocationItems[] = [];

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
  hub: { _id: ObjectId; origin: string }
) => {
  try {
    const location = await checkInvalidLocationDao(
      data.shipment_destination_location_name
    );
    if (!location) {
      invalidLocation.push({
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
        duplicateEntries.push({
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
        invalidEntries.push({
          destination: data.shipment_destination_location_name,
          itemId: data.primary_key,
          lpst: data.LPST,
          zone: data.Zone,
          reason: "Source & Destination is same",
        });
      } else if (!REGX.LPST.test(data.LPST)) {
        invalidEntries.push({
          destination: data.shipment_destination_location_name,
          itemId: data.primary_key,
          lpst: data.LPST,
          zone: data.Zone,
          reason: "Incorrect LPST",
        });
      } else if (!REGX.PALLET_ITEMS.test(data.primary_key)) {
        invalidEntries.push({
          destination: data.shipment_destination_location_name,
          itemId: data.primary_key,
          lpst: data.LPST,
          zone: data.Zone,
          reason: "In-valid item name",
        });
      } else {
        const inserted = await createLocationItemDao({ ...data, hub: hub });
        validEntries.push(inserted);
      }
    }
  } catch (error) {
    console.error("Error processing CSV line:", error);
  }
};

export const uploadLocationItemV2 = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const filePath = `./uploads/${file?.originalname}`;
    const { origin } = res.locals;
    invalidLocation = [];
    duplicateEntries = [];
    validEntries = [];
    invalidEntries = [];

    const readStream = fs.createReadStream(filePath);

    const count = await getCsvRowCount(filePath);

    const totalRows = count ?? 0;
    let processedRows = 0;

    for await (const csvLine of readStream.pipe(csvParser())) {
      await processCsvLine(csvLine, origin);
      processedRows++;
      const percentage = Math.round((processedRows / totalRows) * 100);
      io.emit("progress", percentage);
    }

    fs.unlinkSync(filePath); // Delete the temporary uploaded file

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Items created",
      message: "Items Created Successfully",
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
