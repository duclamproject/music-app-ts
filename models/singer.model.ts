import mongoose, { Schema } from "mongoose";

const singerSchema = new Schema(
  {
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Singer = mongoose.model("Singer", singerSchema, "singers");
export default Singer;
