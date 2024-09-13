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
   

      if (user) {
        const currUser = user as CurrentUser;
        token.user = {
          id: currUser.id,
          username: currUser.username,
          name: currUser.name,
          age: currUser.age,
          balance: currUser.balance,
          wishlistIds: currUser.wishlistIds,
          avatarUrl: currUser.avatarUrl,
          createdAt: currUser.createdAt,
        };
        return token; // Return the token with updated user information
      }
  

      if (trigger === "update" && session?.user) {
        const tokenUser = token.user as CurrentUser;
        const { avatarUrl, balance,intro } = session.user;

        const updateData: Partial<{ avatarUrl: string; balance: number,bio:string }> = {};

        if (avatarUrl) {
          updateData.avatarUrl = avatarUrl;
        }

        if (balance !== undefined) {
          updateData.balance = (tokenUser.balance || 0) + balance;
        }

        if(intro){
          updateData.bio = intro
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
      }
      return token; 
    },

    session: async ({ session, token }) => {
      const tokenUser = token.user as CurrentUser;

      session.user = tokenUser;

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
