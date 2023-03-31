import { notFound } from "next/navigation";
import { FaRegClock } from "react-icons/fa";

import { setMetadata } from "@/lib/utils";
import { colorfulColors, formatDate } from "@/lib/utils";
import { Markdown, TimeAgo, PageWrapper } from "@/components";
import { getPostContent, getAllPostsProps } from "@/lib/blog";

export default async function Page({ params: { postid } }: { params: { postid: string } }) {
  const decodedPostid = decodeURIComponent(postid);
  const isPostExists = getAllPostsProps().find((item) => item.id == decodedPostid);
  if (isPostExists === undefined) notFound();

  const result = await getPostContent(decodedPostid);

  return (
    <PageWrapper aria-label='blog content page' className='frame w-full flex flex-col items-center gap-5'>
      <header aria-label='blog title' className='flex flex-col items-center gap-5'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-700 text-center'>{result.title}</h1>
        <div className='flex flex-col md:flex-row items-center gap-2 text-gray-500'>
          <div className='flex flex-row items-center gap-1'>
            <div className='flex flex-row items-center gap-[1px]'>
              <FaRegClock size={13} />
              <p>{formatDate(result.date).split(" ")[0]}</p>
            </div>
            <TimeAgo date={result.date} />
          </div>
          <div className='flex flex-row gap-2'>
            {result.tags.map((tag, index) => (
              <div key={index} style={{ color: colorfulColors[index], fontWeight: "bold" }}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </header>
      <article aria-label='markdown' className='w-full max-w-3xl markdown' style={{ scrollBehavior: "smooth" }}>
        <Markdown serializedMDX={result.serializedMDX} />
      </article>
    </PageWrapper>
  );
}

export function generateStaticParams() {
  return getAllPostsProps().map((post) => ({ postid: post.id }));
}

export async function generateMetadata({ params: { postid } }: { params: { postid: string } }) {
  return setMetadata(`Blog • ${postid}`);
}
