import { Welcome, Timer, Projects, Feedback } from "./components";
import { Youtube } from "@/components";

export default function Page() {
  return (
    <div className='w-full flex flex-col'>
      <Welcome />
      <Timer />
      <Projects />
      <Feedback />
    </div>
  );
}
