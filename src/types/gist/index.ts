import z from "zod";

const CodeFile = z.object({
  code: z.string(),
  filename: z.string(),
  language: z.string()
});

const Gist = z.object({
  _id: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  title: z.string(),
  public: z.boolean(),
  files: z.array(CodeFile)
});

type GistType = z.TypeOf<typeof Gist>;
type CodeFileType = z.TypeOf<typeof CodeFile>;

export { Gist, CodeFile };
export type { GistType, CodeFileType };
