import { setMetadata } from "@/lib/utils";
import { RecordLists } from "../components";
import fetchFeedbacks from "./fetchFeedbacks";

export const metadata = setMetadata("Feedback");

export default async function Page() {
  const result = await fetchFeedbacks();
  const totalCount = result.totalCount;
  const feedbacks = result.data;

  return (
    <main aria-label='feedback center page' className='frame w-full flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>All Feedbacks({totalCount})</h1>
        <RecordLists records={feedbacks} />
      </div>
    </main>
  );
}
