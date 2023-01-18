import { Welcome, Projects } from "./components";

export default function Page() {
  return (
    <div className='w-full flex flex-col mb-40'>
      <Welcome />
      <Projects />
    </div>
  );
}
