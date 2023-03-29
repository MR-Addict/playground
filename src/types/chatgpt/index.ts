import z from "zod";

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const Options = z.object({
  model: z.enum(["gpt-3.5-turbo"]),
  temperature: z.number().min(0).max(1).optional(),
  top_p: z.number().min(0).max(1).optional(),
  n: z.number().int().min(1).optional(),
  stream: z.boolean().optional(),
  max_tokens: z.number().int().optional(),
  presence_penalty: z.number().min(0).max(2).optional(),
  frequency_penalty: z.number().min(0).max(2).optional(),
});

const ChatRequest = Options.merge(z.object({ messages: z.array(Message) }));

type ChatRequestType = z.TypeOf<typeof ChatRequest>;
type MessageType = z.TypeOf<typeof Message>;
type OptionsType = z.TypeOf<typeof Options>;

export { ChatRequest, Message, Options };
export type { ChatRequestType, MessageType, OptionsType };
