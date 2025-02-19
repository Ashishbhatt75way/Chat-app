export interface IMessage extends Document {
  groupId: string;
  sender: string;
  content: string;
  timestamp: Date;
}
