import { User } from "@prisma/client";
export type CurrentUser = Omit<User,"createdAt"> & {
    // id: string;
    // username: string;
    // name: string;
    // age: number;
    // balance: number;
    // favoriteIds: string[];
    createdAt : string;
};