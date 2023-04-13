import { ObjectId } from "mongodb";

type TShipmentStatus = "created" | "asign-grid" | "out" | "cancelled";

type TShipments = {
  palletId: string;
  items: string[];
  shipmentDestination: string;
  shipmentOrigin: string;
  shipmentId: string;
  gridId: ObjectId;
  latestStatus: TShipmentStatus;
  status: {
    statusName: TShipmentStatus;
    updatedBy: ObjectId;
    time: Date;
  }[];
};
