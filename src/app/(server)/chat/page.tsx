import { redirect } from "next/navigation";

import Chat from "./Chat";
import { env } from "@/types/env";
import { setMetadata } from "@/lib/utils";
import { checkPerm } from "@/lib/auth/checkPerm";
import { PageWrapper } from "@/components/client";
import { ChatContextProvider } from "./components";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Chat");

export default async function Page() {
  const session = await pageSession();
  const userPermission = checkPerm(session?.user.role || "vistor", "contributor");
  if (!userPermission) redirect("/");

  return (
    <PageWrapper className='w-full frame flex-1 flex flex-col'>
      <ChatContextProvider openAIApiKey={env.OPENAI_TOKEN}>
        <Chat />
      </ChatContextProvider>
    </PageWrapper>
  );
}
