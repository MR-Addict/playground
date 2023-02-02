import { notFound } from "next/navigation";

import Pagination from "./Pagination";
import { groupBy } from "@/lib/utils";
import { RecordLists } from "../../components";
import { fetchPages, fetchOnePage } from "../lib";

export default async function Page({ params: { pageid } }: { params: { pageid: string } }) {
  const pages = await fetchPages(50);
  const currentPage = Number(pageid);

  if (!Number.isInteger(isNaN(currentPage) || currentPage) || currentPage > pages || currentPage < 1) notFound();

  const res = await fetchOnePage(50, Number(pageid));
  const result = groupBy(res, (commit) => commit.date.split(" ")[0]);
  const totalCount = result.totalCount;
  const commits = result.data;

  return (
    <main aria-label='commits page' className='frame w-full'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>Commits({totalCount})</h1>
        <RecordLists records={commits} />
        <Pagination count={pages} currentPage={currentPage} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const data = [];
  const pages = await fetchPages(50);
  for (let i = 1; i <= pages; i++) data.push({ pageid: String(i) });
  return data;
}
