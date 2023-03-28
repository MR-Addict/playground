import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/types/env";
import { User } from "@/types/user";
import { user } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  jwt: { secret: env.NEXTAUTH_SECRET },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const result = await user.compare(username, password);
        const parsedUser = User.parse(result.user);
        return parsedUser as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    session({ session, token }) {
      // @ts-expect-error
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
