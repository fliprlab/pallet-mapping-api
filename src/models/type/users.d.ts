import { ObjectId } from "mongodb";

type TUsers = {
  userName: string;
  password: string;
  origin: {
    _id: ObjectId;
    origin: String;
  };
  active?: boolean;
  addedBy: ObjectId;
};
