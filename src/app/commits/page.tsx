import { fetchCommits } from "./lib";
import { Timeline } from "./components";

export default async function Page() {
  const commits = await fetchCommits();

  return (
    <div className='frame w-full'>
      <Timeline commits={commits} />
    </div>
  );
}
