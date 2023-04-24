import z from "zod";

const NodeEnv = z.enum(["development", "production", "test", "preview"]);

const Env = z.object({
  MAILPASS: z.string(),
  MAILFROM: z.string(),
  MONGODB_URI: z.string(),
  GITHUB_TOKEN: z.string(),
  NEXTAUTH_SECRET: z.string(),
  SANITY_PROJECT_ID: z.string(),
  NODE_ENV: NodeEnv,
});

type EnvType = z.TypeOf<typeof Env>;

const env = Env.parse(process.env);

export { env };
export type { EnvType };
