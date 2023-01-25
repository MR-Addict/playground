import { FaRegClock } from "react-icons/fa";

import { Markdown } from "@/components";
import { colorfulColors } from "../config";
import { getPostContent, getAllPostsProps } from "@/lib/post";

export default async function Page({ params: { postid } }: { params: { postid: string } }) {
  const decodedPostid = decodeURIComponent(postid);
  const result = await getPostContent(decodedPostid);

  return (
    <div className='frame w-full flex flex-col items-center gap-5'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-3xl md:text-4xl font-bold text-gray-700 text-center'>{result.title}</div>
        <div className='flex flex-col md:flex-row items-center gap-2 text-gray-500'>
          <div className='flex flex-row items-center gap-1'>
            <FaRegClock size={15} />
            <p>{result.date}</p>
          </div>
          <div className='flex flex-row gap-2'>
            {result.tags.map((tag, index) => (
              <div key={index} style={{ color: colorfulColors[index], fontWeight: "bold" }}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full max-w-3xl markdown'>
        <Markdown serializedMDX={result.serializedMDX} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getAllPostsProps().map((post) => ({ postid: post.id }));
}
