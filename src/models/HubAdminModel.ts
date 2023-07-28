import { ObjectId } from "mongodb";
import { Model, model, Schema } from "mongoose";
import { THubAdmin } from "./type/hubAdmin.";

const HubAdminSchema = new Schema<THubAdmin>(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    origin: {
      _id: ObjectId,
      origin: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["hub-admin"],
      default: "hub-admin",
    },
  },
  {
    timestamps: true,
  }
);

const HubAdminModel: Model<THubAdmin> = model("hubAdmins", HubAdminSchema);

export default HubAdminModel;
