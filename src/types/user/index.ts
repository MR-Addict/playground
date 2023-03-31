import z from "zod";
import { ObjectId } from "mongodb";

const roles = ["admin", "contributor", "subscriber", "vistor"];
const UserRole = z.enum(["admin", "contributor", "subscriber", "vistor"]);

const User = z.object({
  _id: z.custom<ObjectId>(),
  username: z.string().max(100),
  email: z.string().max(100),
  role: UserRole,
  create_time: z.date(),
  update_time: z.date(),
});

type UserType = z.TypeOf<typeof User>;
type UserRoleType = z.TypeOf<typeof UserRole>;

export { User, UserRole, roles };
export type { UserType, UserRoleType };
