import z from "zod";
import { ObjectId } from "mongodb";

const Feedback = z.object({
  _id: z.custom<ObjectId>(),
  date: z.date(),
  feedback: z.string(),
});

type FeedbackType = z.TypeOf<typeof Feedback>;

export { Feedback };
export type { FeedbackType };
