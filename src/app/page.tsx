import { getMetadata } from "@/lib/utils";
import { Welcome, Timer, Projects, Feedback } from "./components";

export const metadata = getMetadata("Tools");

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
