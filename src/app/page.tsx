import dynamic from "next/dynamic";

import { Welcome } from "./components";
import { getMetadata } from "@/lib/utils";

const Timer = dynamic(() => import("./components/Timer/Timer"));
const Projects = dynamic(() => import("./components/Projects/Projects"));
const Feedback = dynamic(() => import("./components/Feedback/Feedback"));

export const metadata = getMetadata("Home");

export default function Page() {
  return (
    <main aria-label='body' className='w-full flex flex-col'>
      <Welcome />
      <Timer />
      <Projects />
      <Feedback />
    </main>
  );
}
