import { ObjectId } from "mongodb";

type THubAdmin = {
  username: string;
  password: string;
  origin: {
    _id: ObjectId;
    origin: string;
  };
  active: boolean;
};
