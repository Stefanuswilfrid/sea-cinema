// import NextAuth from "next-auth";
// import { DefaultSession } from "next-auth";

// // Assuming CurrentUser contains the custom fields like id, balance, etc.
// import { CurrentUser } from "@/types";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string ; // Add custom properties like id
//       username: string;
//       balance: number;
//       favoriteIds: string[];
//       avatarUrl: string | null;
//       createdAt: string;
//       bio : string | null; 
//     } & DefaultSession["user"]; // Extend default session fields
//   }


// }

import NextAuth, { DefaultSession } from "next-auth";
import { CurrentUser } from ".";

declare module "next-auth" {
  interface Session {
    user: CurrentUser & DefaultSession["user"]; // Extend default session fields (name, email, image)
  }

  interface User extends PrismaUser {} // This ensures the `User` type in NextAuth matches the Prisma `User` type
}
