import Link from "next/link";
import { notFound } from "next/navigation";

import { groupBy } from "@/lib/utils";
import fetchOnePage from "./fetchOnePage";
import { RecordLists } from "../components";

import style from "./page.module.css";

export const revalidate = 0;

export default async function Page({ searchParams: { page } }: { searchParams: { page: string | undefined } }) {
  const currentPage = Number(page || "1");
  if (!Number.isInteger(currentPage) || isNaN(currentPage) || currentPage < 1) notFound();

  const res = await fetchOnePage(currentPage);

  const result = groupBy(res.data, (commit) => commit.date.split(" ")[0]);
  const totalCount = result.totalCount;
  const commits = result.data;

  return (
    <main aria-label='commits page' className='frame w-full'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-slate-700'>Commits({totalCount})</h1>
        <RecordLists records={commits} />
        <div className='flex flex-row justify-center text-gray-700'>
          <Link
            style={{ cursor: res.isPrev ? "pointer" : "not-allowed" }}
            className={[style.prev, res.isPrev ? style.active : null].join(" ")}
            href={{ pathname: "/commits", query: { page: currentPage - (res.isPrev ? 1 : 0) } }}
          >
            Pre
          </Link>
          <Link
            style={{ cursor: res.isNext ? "pointer" : "not-allowed" }}
            className={[style.next, res.isNext ? style.active : null].join(" ")}
            href={{ pathname: "/commits", query: { page: currentPage + (res.isNext ? 1 : 0) } }}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
