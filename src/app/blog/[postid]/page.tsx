import { FaRegClock } from "react-icons/fa";

import { getPostContent, getAllPostsProps } from "@/lib/post";
import { colorfulColors } from "../config";
import Post from "./Post";

export default async function Page({ params: { postid } }: { params: { postid: string } }) {
  const decodedPostid = decodeURIComponent(postid);
  const result = await getPostContent(decodedPostid);

  return (
    <div className='frame w-full flex flex-col items-center gap-5'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-4xl font-bold text-gray-700'>{result.title}</div>
        <div className='flex flex-row items-center gap-2 text-gray-500 '>
          <div className='flex flex-row items-center'>
            <FaRegClock size={15} />
            <p>{result.date}</p>
          </div>
          {result.tags.map((tag, index) => (
            <div key={index} style={{ color: colorfulColors[index], fontWeight: "bold" }}>
              #{tag}
            </div>
          ))}
        </div>
      </div>
      <div className='w-full max-w-3xl markdown'>
        <Post serializedMDX={result.serializedMDX} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getAllPostsProps().map((post) => ({ postid: post.id }));
}
