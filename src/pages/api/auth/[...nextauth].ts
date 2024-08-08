import bcrypt from "bcrypt"
import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "../../../libs/prismadb"
import { CurrentUser } from "@/types"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, trigger, session, user }) => {
      const tokenUser = token.user as CurrentUser;
      if (trigger === "update" && session?.user?.balance) {
        const currentBalance = tokenUser.balance + session.user.balance;
        await prisma.user.update({
          where: {
            username: tokenUser?.username! ,
          },
          data: {
            balance: currentBalance,
          },
        });

        if (token.user) {
          token.user = {
            ...tokenUser,
            balance: currentBalance,
          };
        }

        return token;
      } else {
        user && (token.user = user);

        if (user) {
          token.user = {
            ...user,
            hashedPassword: undefined,
          };
        }

        return token;
      }
    },
    session: async ({ session, token }) => {
      session.user = token.user as DefaultSession["user"];
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);