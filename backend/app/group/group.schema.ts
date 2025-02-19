import { type IGroup } from "./group.dto";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema<IGroup>(
  {
    name: { type: String, required: true },
    privacy: {
      type: String,
      required: true,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
    admin: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    pendingInvites: [{ type: Schema.Types.String, ref: "user" }],
    members: {
      type: [{ type: Schema.Types.String, ref: "user" }],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IGroup>("group", groupSchema);
