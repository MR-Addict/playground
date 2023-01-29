import { Welcome, Timer, Projects, Feedback } from "./components";

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
