import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import ChatWindow from "./ChatWindow";
import { setMetadata } from "@/lib/utils";
import { ChatContextProvider } from "./components";
import authOptions from "@/pages/api/auth/[...nextauth]";

export const metadata = setMetadata("Chat");

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <main className='w-full frame flex-1 flex flex-col'>
      <ChatContextProvider openAIApiKey={process.env.OPENAI_TOKEN || ""}>
        <ChatWindow />
      </ChatContextProvider>
    </main>
  );
}
