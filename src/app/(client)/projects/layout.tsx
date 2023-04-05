import { checkPerm } from "@/lib/auth/checkPerm";
import { PageWrapper } from "@/components/client";
import { pageSession } from "@/lib/auth/serverSession";
import { AddButton, DeletePopupContextProvider, ProjectContextProvider } from "./components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await pageSession();
  const permission = checkPerm(session?.user.role || "vistor", "admin");

  return (
    <PageWrapper className='w-full frame flex flex-col gap-3'>
      <ProjectContextProvider>
        <DeletePopupContextProvider>
          <header className='flex flex-row items-end justify-between gap-2'>
            <h1 className='text-gray-700 font-bold text-3xl'>Projects</h1>
            {permission && <AddButton />}
          </header>
          {children}
        </DeletePopupContextProvider>
      </ProjectContextProvider>
    </PageWrapper>
  );
}
