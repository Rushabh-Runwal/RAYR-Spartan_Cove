import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Store Google UID as _id
    name: String,
    phoneNumber: String,
    email: { type: String, unique: true },
    profilePicture: { type: String },
    statusMessage: String,
    groups: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
