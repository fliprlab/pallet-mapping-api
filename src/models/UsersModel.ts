import { Model, model, Schema } from "mongoose";

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
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UsersModel: Model<TUsers> = model("users", usersSchema);

export default UsersModel;
