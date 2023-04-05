import z from "zod";
import { ObjectId } from "mongodb";

const Project = z.object({
  _id: z.custom<ObjectId>(),
  owner: z.string(),
  name: z.string(),
  url: z.string(),
  homepageUrl: z.union([z.string(), z.null()]),
  createdAt: z.date(),
  intro: z.union([z.string(), z.null()]),
  stars: z.number(),
  forks: z.number(),
  lang: z.union([z.string(), z.null()]),
  langColor: z.union([z.string(), z.null()]),
  lastUpdate: z.union([z.date(), z.null()]),
  topics: z.array(z.union([z.string(), z.null()])),
});

type ProjectType = z.TypeOf<typeof Project>;

export { Project };
export type { ProjectType };
