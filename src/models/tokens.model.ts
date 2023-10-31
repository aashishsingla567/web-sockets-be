import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Please provide a token"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    type: {
      type: String,
      required: [true, "Please provide a type"],
      trim: true,
    },
    expires: {
      type: Date,
      required: [true, "Please provide an expiry date"],
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
