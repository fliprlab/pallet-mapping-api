import { ObjectId } from "mongodb";

type TLocation = {
  location: string;
  createdBy: {
    _id: ObjectId;
    date: Date;
  };
};
