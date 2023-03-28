import { redirect } from "next/navigation";

import Chat from "./Chat";
import { env } from "@/types/env";
import { setMetadata } from "@/lib/utils";
import { ChatContextProvider } from "./components";
import { pageSession } from "@/lib/auth";

export const metadata = setMetadata("Chat");

export default async function Page() {
  const session = await pageSession();
  if (!session) redirect("/");

  return (
    <main className='w-full frame flex-1 flex flex-col'>
      <ChatContextProvider openAIApiKey={env.OPENAI_TOKEN}>
        <Chat />
      </ChatContextProvider>
    </main>
  );
}
