import { ObjectId } from "mongodb";
import { TShipmentStatus } from "./shipments";

type TItem = {
  itemId: string;
  shipmentId: ObjectId;
  virtualId: string;
  pallet: {
    _id: ObjectId;
    name: string;
  };
  grid: {
    _id: ObjectId;
    name: string;
  };
  status: TShipmentStatus;
  cancelAt: Date;
  origin: string;
  destination: string;
  lastUpdatedAt: Date;
};
