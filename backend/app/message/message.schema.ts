import { Schema, model, Document } from "mongoose";
import { IMessage } from "./message.dto";

const messageSchema = new Schema<IMessage>({
  groupId: { type: Schema.Types.String, ref: "group", required: true },
  sender: { type: Schema.Types.String, ref: "user", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", messageSchema);
