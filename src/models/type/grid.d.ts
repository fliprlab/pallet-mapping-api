import { ObjectId } from "mongodb";

type TGridStatus = "occupied" | "unoccupied";

type TGrid = {
  gridId: string;
  palletId?: {
    _id: ObjectId;
    name: string;
  };
  time?: Date;
  hub: {
    _id: ObjectId | null;
    name: string;
  };
  status?: TGridStatus;
  createdBy?: ObjectId;
  updatedBy?: { _id: ObjectId; time: Date };
  destination?: string;
  active?: boolean;
  reason?: string;
};
