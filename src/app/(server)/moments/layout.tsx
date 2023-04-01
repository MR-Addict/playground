import { redirect } from "next/navigation";

import { checkPerm } from "@/lib/auth/checkPerm";
import { PageWrapper } from "@/components/client";
import { pageSession } from "@/lib/auth/serverSession";
import { MomentContextProvider, DeletePopupContextProvider } from "./components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await pageSession();
  const userPermission = checkPerm(session?.user.role || "vistor", "admin");
  if (!userPermission) redirect("/");

  return (
    <PageWrapper aria-label='moments page' className='frame w-full flex flex-col gap-7'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Moments</h1>
        <p className='text-xl text-gray-500'>I like to write daily moments of my life. Here is a collection of them.</p>
      </header>
      <MomentContextProvider>
        <DeletePopupContextProvider>{children}</DeletePopupContextProvider>
      </MomentContextProvider>
    </PageWrapper>
  );
}
