import { ObjectId } from "mongodb";
type TShipmentStatus =
  | "created"
  | "put away"
  | "picked up"
  | "dispatched"
  | "cancelled";

type TLocationItems = {
  itemId: string;
  destination: string;
  virtualId?: string;
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
  gridId?: string;
  hub?: {
    _id: ObjectId;
    origin: String;
  };
  cancelled?: boolean;
};
