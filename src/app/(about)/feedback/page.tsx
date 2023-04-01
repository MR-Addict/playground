import fetchFeedbacks from "./fetchFeedbacks";
import { setMetadata } from "@/lib/utils";
import { RecordLists } from "../components";
import { PageWrapper } from "@/components/client";

export const metadata = setMetadata("Feedback");

export default async function Page() {
  const result = await fetchFeedbacks();
  const totalCount = result.totalCount;
  const feedbacks = result.data;

  return (
    <PageWrapper aria-label='feedback center page' className='flex-1 frame w-full flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>Feedbacks({totalCount})</h1>
        <RecordLists records={feedbacks} />
      </div>
    </PageWrapper>
  );
}
