import bcrypt from "bcrypt";
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../libs/prismadb";
import { CurrentUser } from "@/types";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        
        
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, trigger, session, user }) => {
      const tokenUser = token.user as CurrentUser;
      console.log("tu",tokenUser)
      console.log("whattttt")

      if (trigger === "update" && session?.user) {
        const { avatarUrl, balance } = session.user;

        const updateData: Partial<{ avatarUrl: string; balance: number }> = {};

        if (avatarUrl) {
          updateData.avatarUrl = avatarUrl;
        }

        if (balance !== undefined) {
          updateData.balance = (tokenUser.balance || 0) + balance;
        }

        await prisma.user.update({
          where: {
            username: tokenUser.username!,
          },
          data: updateData,
        });

        token.user = {
          ...tokenUser,
          ...updateData, 
        };

        return token;
      } else {
        if(user){
        const currUser = user as CurrentUser
console.log("uid",currUser.id)
      // Now you can safely add custom fields like id, balance, etc. to session.user
      session = {
        id: currUser.id,
        username: currUser.username,
        name: currUser.name,
        age: currUser.age,
        balance: currUser.balance,
        favoriteIds: currUser.wishlistIds,
        avatarUrl: currUser.avatarUrl,
        createdAt: currUser.createdAt,
      };

      return session;
        
      }
    }
    },
    
    session: async ({ session, token }) => {
      // session.user = token.user as DefaultSession["user"];
      // return session;
      console.log("token",token)
      const tokenUser = token.user as CurrentUser;

      session.user = tokenUser

      return session; 
    },
    
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
