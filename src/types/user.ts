import z from "zod";

const User = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(["admin", "contributor", "subscriber"]),
});

type UserType = z.TypeOf<typeof User>;

export { User };
export type { UserType };
