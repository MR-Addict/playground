import z from "zod";

const Env = z.object({
  MAILPASS: z.string(),
  MAILFROM: z.string(),
  MONGODB_URI: z.string(),
  OPENAI_TOKEN: z.string(),
  GITHUB_TOKEN: z.string(),
  CRONITOR_TOKEN: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test", "preview", "preview-production"]),
});

type EnvType = z.TypeOf<typeof Env>;

const env = Env.parse(process.env);

export { env };
export type { EnvType };
