import { Conversation, Message, User } from "@prisma/client";
export type CurrentUser = Omit<User,"createdAt"> & {
    // id: string;
    // username: string;
    // name: string;
    // age: number;
    // balance: number;
    // favoriteIds: string[];
    createdAt : string;
};

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};
  
export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};

export interface NotificationInterface {
  id: string;
  read: boolean;
  createdAt: string;

}