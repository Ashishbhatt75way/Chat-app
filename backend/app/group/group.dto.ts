import { Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  admin: string;
  active: boolean;
  privacy: "PUBLIC" | "PRIVATE";
  pendingInvites: string[];
  members: string[];
}
