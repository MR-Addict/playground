import z from "zod";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/types/env";
import { user } from "@/lib/mongodb";
import { UserRole } from "@/types/user";

async function updateSession(req: any) {
  const User = z.object({
    _id: z.string(),
    username: z.string().max(100).optional(),
    email: z.string().max(100).optional(),
    role: UserRole.optional(),
    password: z.string().optional()
  });

  const parsedResult = User.safeParse(req);
  if (!parsedResult.success) return false;

  const parsedUser = parsedResult.data;
  const result = await user.update(parsedUser._id, {
    email: parsedUser.email,
    username: parsedUser.username,
    role: parsedUser.role,
    password: parsedUser.password
  });

  if (result.status) return true;
  else {
    console.error(result.message);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  jwt: { secret: env.NEXTAUTH_SECRET },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const result = await user.compare(username, password);
        if (!result.status) {
          console.error(result.message);
          return null;
        } else return result.user as any;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        const success = await updateSession(session.user);
        if (success) token.user = session.user;
      } else if (user) token.user = user;

      return token;
    },

    async session({ session, token }) {
      // @ts-expect-error
      session.user = token.user;
      return session;
    }
  }
};

export default NextAuth(authOptions);
