import fetchFeedbacks from "./fetchFeedbacks";
import { RecordLists } from "../components";

export const revalidate = 60;

export default async function Page() {
  const result = await fetchFeedbacks();
  const totalCount = result.totalCount;
  const feedbacks = result.data;

  return (
    <div className='frame w-full flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>All Feedbacks({totalCount})</h1>
        <RecordLists records={feedbacks} />
      </div>
    </div>
  );
}
