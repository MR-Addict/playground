import { Welcome, Timer, Projects, Feedback } from "./components";

export const metadata = {
  title: "Home • Playground",
  icons: { icon: "/favicon.ico" },
};

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
