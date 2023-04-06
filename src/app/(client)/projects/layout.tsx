import { checkPerm } from "@/lib/auth/checkPerm";
import { PageWrapper } from "@/components/client";
import { pageSession } from "@/lib/auth/serverSession";
import { Header, DeletePopupContextProvider, ProjectContextProvider } from "./components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await pageSession();
  const permission = checkPerm(session?.user.role || "vistor", "admin");

  return (
    <PageWrapper className='w-full frame flex flex-col gap-3 isolate'>
      <ProjectContextProvider>
        <DeletePopupContextProvider>
          {permission && <Header />}
          {children}
        </DeletePopupContextProvider>
      </ProjectContextProvider>
    </PageWrapper>
  );
}
