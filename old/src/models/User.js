import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  carpoolsOwned: [{ type: Schema.Types.ObjectId, ref: "Carpool" }],
  carpoolsJoined: [{ type: Schema.Types.ObjectId, ref: "Carpool" }],
  profilePicURI: { type: String },
});

UserSchema.virtual("numberOfOwnedCarpools").get(function () {
  return this.carpoolsOwned.length;
});

export default model("User", UserSchema);
