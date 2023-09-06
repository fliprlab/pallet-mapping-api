import { ObjectId } from "mongodb";

type TPalletStatus =
  | "pallet-created"
  | "pallet-asign-grid"
  | "pallet-picked-up"
  | "pallet-out";

type TPallet = {
  palletId: string;
  status: TPalletStatus;
  asignGrid: ObjectId;
  lastUpdatedBy: {
    id: ObjectId;
    time: Date;
  };
  shipmentId: ObjectId;
  hub: string;
  destination: string;
};
