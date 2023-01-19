import { Welcome, Timer, Projects } from "./components";

export default function Page() {
  return (
    <div className='w-full flex flex-col'>
      <Welcome />
      <Timer />
      <Projects />
    </div>
  );
}
