import z from "zod";
import { ObjectId } from "mongodb";

const UserRole = z.enum(["admin", "contributor", "subscriber", "vistor"]);

const User = z.object({
  _id: z.custom<ObjectId>(),
  username: z.string(),
  email: z.string(),
  role: UserRole,
});

type UserType = z.TypeOf<typeof User>;
type UserRoleType = z.TypeOf<typeof UserRole>;

export { User, UserRole };
export type { UserType, UserRoleType };
