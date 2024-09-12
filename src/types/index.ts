import { Conversation, Message, Movie, Seat, Transaction, User } from "@prisma/client";
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
enum NotificationType {
  TICKET_PURCHASE,
}

export interface NotificationInterface {
  id: string;
  read: boolean;
  userId: string;
  message: string;

  type: NotificationType;

  createdAt: string;
}

export interface TransactionInterface extends Transaction {
  movie?: Movie | null;   // Movie is optional
  seats?: Seat[];         // Seats is an array of Seat objects
}