import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/types/env";
import { user } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  jwt: { secret: env.NEXTAUTH_SECRET },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const result = await user.compare(username, password);
        if (!result.status) {
          console.error(result.message);
          return null;
        } else return result.user as any;
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
