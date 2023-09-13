import { scanLocation } from "./scanLocation";
import { scanPallet } from "./scanPallet";

const dispatch = {
  scanPallet: scanPallet,
  scanLocation: scanLocation,
};

export default dispatch;
