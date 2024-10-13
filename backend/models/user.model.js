import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    email: { type: String, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
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
