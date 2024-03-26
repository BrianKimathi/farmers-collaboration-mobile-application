import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    votesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Expert = mongoose.model("Expert", expertSchema);

export default Expert;
