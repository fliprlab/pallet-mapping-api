import { ObjectId } from "mongodb";
type TShipmentStatus = "created" | "out" | "cancelled";

type TLocationItems = {
  itemId: string;
  destination: string;
  _id: ObjectId;
  pallet: {
    _id: ObjectId;
    name: string;
  };
  status: TShipmentStatus;
  origin: string;
  destination: string;
};
