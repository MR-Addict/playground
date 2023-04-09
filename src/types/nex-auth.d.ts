import NextAuth from "next-auth";

import { UserType } from "./user";

declare module "next-auth" {
  interface Session {
    user: UserType & { password?: string };
  }
}
