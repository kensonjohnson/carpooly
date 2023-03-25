import { Schema, model } from "mongoose";

const CarpoolSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default model("Carpool", CarpoolSchema);
