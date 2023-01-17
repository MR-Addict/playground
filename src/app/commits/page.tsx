import { fetchCommits } from "./lib";
import { Timeline } from "./components";

export default async function Page() {
  const data = await fetchCommits();
  const totalCount = data.totalCount;

  return (
    <div className='frame w-full'>
      <Timeline totalCount={totalCount} commits={data.data} />
    </div>
  );
}
