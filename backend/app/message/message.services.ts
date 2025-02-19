import mongoose from "mongoose";
import { IMessage } from "./message.dto";
import { Message } from "./message.schema";

export const createMessage = async (
  data: Partial<IMessage>,
  groupId: string
) => {
  const { content, sender } = data;

  const result = await Message.create({
    content,
    groupId,
    sender,
    timestamp: new Date(),
  });
  await result.save();
  return result;
};

export const getMessages = async (groupId: string) => {
  const messages = await Message.find({
    groupId: new mongoose.Types.ObjectId(groupId),
  })
    .sort({ timestamp: 1 })
    .populate("sender", "name _id")
    .lean()
    .exec();

  return messages;
};
