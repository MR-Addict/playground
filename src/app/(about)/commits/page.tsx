import classNames from "classnames";
import { notFound } from "next/navigation";

import style from "./page.module.css";
import fetchOnePage from "./fetchOnePage";
import { RecordLists } from "../components";
import { setMetadata, groupBy } from "@/lib/utils";
import { ClientLink, PageWrapper } from "@/components/client";

export const revalidate = 0;

export const metadata = setMetadata("Commits");

export default async function Page({ searchParams: { page } }: { searchParams: { page: string | undefined } }) {
  const currentPage = Number(page || "1");
  if (!Number.isInteger(currentPage) || isNaN(currentPage) || currentPage < 1) notFound();

  const res = await fetchOnePage(currentPage);

  const result = groupBy(res.data, (commit) => commit.date.split(" ")[0]);
  const totalCount = result.totalCount;
  const commits = result.data;

  return (
    <PageWrapper aria-label='commits page' className='flex-1 frame w-full flex flex-col gap-5'>
      <h1 className='text-2xl font-bold text-slate-700'>Commits({totalCount})</h1>
      <RecordLists records={commits} />
      <div className='flex flex-row justify-center'>
        <ClientLink
          disabled={!res.isPrev}
          style={{ cursor: res.isPrev ? "pointer" : "not-allowed" }}
          className={classNames(style.link, style.prev, res.isPrev ? style.active : style.deactive)}
          href={{ pathname: "/commits", query: { page: currentPage - (res.isPrev ? 1 : 0) } }}
        >
          Prev
        </ClientLink>
        <ClientLink
          disabled={!res.isNext}
          style={{ cursor: res.isNext ? "pointer" : "not-allowed" }}
          className={classNames(style.link, style.next, res.isNext ? style.active : style.deactive)}
          href={{ pathname: "/commits", query: { page: currentPage + (res.isNext ? 1 : 0) } }}
        >
          Next
        </ClientLink>
      </div>
    </PageWrapper>
  );
}
