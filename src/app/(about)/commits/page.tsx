import fetchCommits from "./fetchCommits";
import { RecordLists } from "../components";

export default async function Page() {
  const result = await fetchCommits();
  const totalCount = result.totalCount;
  const commits = result.data;

  return (
    <div className='frame w-full'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>All Commits({totalCount})</h1>
        <RecordLists records={commits} />
      </div>
    </div>
  );
}
