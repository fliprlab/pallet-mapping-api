import { Document, Model, model, Schema } from "mongoose";

export interface IToken extends Document {
  token: string;
  expiryDate: Date;
  userId: Schema.Types.ObjectId;
  role: "admin" | "user";
  origin: Schema.Types.ObjectId;
}

const TokenSchema = new Schema<IToken>(
  {
    token: String,
    expiryDate: Date,
    userId: Schema.Types.ObjectId,
    role: String,
    origin: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const TokenModel: Model<IToken> = model("tokens", TokenSchema);

export default TokenModel;
