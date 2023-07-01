import dynamic from "next/dynamic";

import { Welcome } from "./components";
import { setMetadata } from "@/lib/utils";
import { PageWrapper } from "@/components/client";

const Timer = dynamic(() => import("./components/Timer/Timer"));
const Projects = dynamic(() => import("./components/Projects/Projects"));
const Feedback = dynamic(() => import("./components/Feedback/Feedback"));

export const metadata = setMetadata("Home");

export default function Page() {
  return (
    <PageWrapper aria-label="home page" className="w-full flex flex-col">
      <Welcome />
      <Timer />
      <Projects />
      <Feedback />
    </PageWrapper>
  );
}
