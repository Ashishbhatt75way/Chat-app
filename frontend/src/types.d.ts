declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: "USER" | "ADMIN";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  sucess: boolean;
}

interface Group {
  _id: string;
  name: string;
  privacy: "PUBLIC" | "PRIVATE";
  members: User[];
  admin: User;
  messages: Message[];
  pendingInvites: User[];
}

interface Message {
  _id: string;
  groupId: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Analytics {
  totalGroups: number;
  totalUsers: number;
  totalMessages: number;
  totalGroupUsers: number;
}