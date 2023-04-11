import { ObjectId } from "mongodb";

type TShipmentStatus = "created" | "asign-grid" | "out" | "cancelled";

type TShipments = {
  palletId: string;
  items: string[];
  palletOrigin: string;
  shipmentOrigin: string;
  shipmentId: string;
  gridId: string;
  latestStatus: TShipmentStatus;
  status: {
    statusName: TShipmentStatus;
    updatedBy: ObjectId;
    time: Date;
  }[];
};
