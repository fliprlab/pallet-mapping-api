import { Model, model, Schema } from "mongoose";
import { TUsers } from "./type/users";

const usersSchema = new Schema<TUsers>(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    origin: {
      _id: Schema.Types.ObjectId,
      origin: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    addedBy: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const UsersModel: Model<TUsers> = model("users", usersSchema);

export default UsersModel;
