import { redirect } from "next/navigation";

import { Sidebar } from "./components";
import { PageWrapper } from "@/components/client";
import { pageSession } from "@/lib/auth/serverSession";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await pageSession();
  if (!session) redirect("/");

  return (
    <PageWrapper aria-label="account page" className="w-full flex-1 frame background flex flex-col md:flex-row gap-2">
      <Sidebar session={session} />
      {children}
    </PageWrapper>
  );
}
