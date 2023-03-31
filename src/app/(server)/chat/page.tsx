import { redirect } from "next/navigation";

import Chat from "./Chat";
import { env } from "@/types/env";
import { setMetadata } from "@/lib/utils";
import { PageWrapper } from "@/components";
import { ChatContextProvider } from "./components";
import { pageSession } from "@/lib/auth/serverSession";
import { checkUserPermission } from "@/lib/auth/checkUserPermission";

export const metadata = setMetadata("Chat");

export default async function Page() {
  const session = await pageSession();
  const userPermission = checkUserPermission(session?.user.role || "vistor", "contributor");
  if (!userPermission) redirect("/");

  return (
    <PageWrapper className='w-full frame flex-1 flex flex-col'>
      <ChatContextProvider openAIApiKey={env.OPENAI_TOKEN}>
        <Chat />
      </ChatContextProvider>
    </PageWrapper>
  );
}
