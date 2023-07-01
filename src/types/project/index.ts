import z from "zod";

const DatabaseProject = z.object({
  _id: z.string(),
  index: z.number(),
  owner: z.string(),
  name: z.string()
});

const Project = DatabaseProject.merge(
  z.object({
    url: z.string(),
    homepageUrl: z.union([z.string(), z.null()]),
    createdAt: z.date(),
    intro: z.union([z.string(), z.null()]),
    stars: z.number(),
    forks: z.number(),
    lang: z.union([z.string(), z.null()]),
    langColor: z.union([z.string(), z.null()]),
    lastUpdate: z.union([z.date(), z.null()]),
    topics: z.array(z.union([z.string(), z.null()]))
  })
);

type ProjectType = z.TypeOf<typeof Project>;
type DatabaseProjectType = z.TypeOf<typeof DatabaseProject>;

export { Project, DatabaseProject };
export type { ProjectType, DatabaseProjectType };
