import { ObjectId } from "mongodb";

type TEvents = {
  eventName: string;
  createdBy: ObjectId;
  relatedTo: {
    tableName: string;
    relatedId: ObjectId;
  };
  eventDomain: string;
};
