import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { logger } from "../../config/logger";
import fs from "fs";
import csvParser from "csv-parser";

import { checkDuplicateLocationItemDao } from "../../dao/location-item-dao/checkDuplicateLocationItem.dao";
import { TLocationItems } from "../../models/type/location-items";
import { checkInvalidLocationDao } from "../../dao/location-item-dao/checkInvalidLocation.dao";
import { REGX } from "../../constants";
import { createLocationItemDao } from "../../dao/location-item-dao/createLocation.dao";
import { io } from "../../app";

export const uploadLocationItemV2 = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const filePath = `./uploads/${file?.originalname}`;

    const invalidLocation: TLocationItems[] = [];
    const duplicateEntries: TLocationItems[] = [];
    const validEntries: TLocationItems[] = [];
    const invalidEntries: TLocationItems[] = [];

    const totalRows = 1274;
    let processedRows = 0;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (data) => {
        const location = await checkInvalidLocationDao(
          data.shipment_destination_location_name
        );
        if (location) {
          invalidLocation.push({
            destination: data.shipment_destination_location_name,
            itemId: data.primary_key,
            lpst: data.LPST,
            zone: data.Zone,
            reason: "Location Not Available",
          });
        } else {
          const duplicate = await checkDuplicateLocationItemDao(
            data.primary_key
          );
          if (duplicate) {
            duplicateEntries.push({
              destination: data.shipment_destination_location_name,
              itemId: data.primary_key,
              lpst: data.LPST,
              zone: data.Zone,
              reason: "Duplicate items",
            });
          } else if (!REGX.LPST.test(data.LPST)) {
            invalidEntries.push({
              destination: data.shipment_destination_location_name,
              itemId: data.primary_key,
              lpst: data.LPST,
              zone: data.Zone,
              reason: "Incorrect LPST",
            });
          } else {
            const inserted = await createLocationItemDao(data);
            validEntries.push(inserted);
          }
        }

        processedRows++;
        const percentage = Math.round((processedRows / totalRows) * 100);
        io.emit("progress", percentage);
      })
      .on("end", () => {
        console.log("final cal;led");

        // File processing completed
        // You can perform any cleanup here if needed
        fs.unlinkSync(filePath); // Delete the temporary uploaded file

        if (processedRows <= 100) {
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
        }
      })
      .on("error", (error) => {
        console.error("Error processing file:", error);
        res.sendStatus(500);
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
