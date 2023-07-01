import z from "zod";
import { ObjectId } from "mongodb";

const Moment = z.object({
  _id: z.custom<ObjectId>(),
  date: z.date(),
  weather: z.string(),
  moment: z.string()
});

type MomentType = z.TypeOf<typeof Moment>;

export { Moment };
export type { MomentType };
