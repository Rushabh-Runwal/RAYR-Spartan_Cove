import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  profilePicture: String,
  statusMessage: String,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group", default: [] }],
});

export default mongoose.model("User", UserSchema);
