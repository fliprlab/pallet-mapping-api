import { ObjectId } from "mongodb";

type TZone = {
  _id?: ObjectId;
  zone: string;
  createdBy: {
    _id: ObjectId;
    date: Date;
  };
};
