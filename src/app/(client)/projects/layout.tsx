import { PageWrapper } from "@/components/client";
import { Header, DeletePopupContextProvider, ProjectContextProvider } from "./components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className="w-full frame flex flex-col gap-7 isolate">
      <ProjectContextProvider>
        <DeletePopupContextProvider>
          <Header />
          {children}
        </DeletePopupContextProvider>
      </ProjectContextProvider>
    </PageWrapper>
  );
}
