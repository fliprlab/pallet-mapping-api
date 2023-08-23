import { ObjectId } from "mongodb";
type TShipmentStatus = "created" | "picked up";

type TLocationItems = {
  itemId: string;
  destination: string;
  _id?: ObjectId;
  pallet?: {
    _id: ObjectId;
    name: string;
    destination: string;
  };
  status?: TShipmentStatus;
  origin?: string;
  destination: string;
  shipmentId?: ObjectId;
  zone: string;
  lpst: string;
  reason?: string;
  hub?: {
    _id: ObjectId;
    origin: String;
  };
};
