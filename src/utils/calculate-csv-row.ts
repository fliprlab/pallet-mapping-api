import csvParser from "csv-parser";
import fs from "fs";

export const calculateCsvRows = async (filePath: string) => {
  let totalRows = 0;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", async (data) => {
      totalRows++;
    });

  return totalRows;
};
