import { Document, Model, model, Schema } from "mongoose";

const AdminUserSchema = new Schema<TAdminUser>(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
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

const AdminUserModel: Model<TAdminUser> = model("adminUsers", AdminUserSchema);

export default AdminUserModel;
