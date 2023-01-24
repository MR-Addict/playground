import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

import { getAllPostsProps } from "@/lib/post";

const colorfulColors = ["#39B5E0", "#A555EC", "#7DCE13", "#FFC93C", "#F49D1A", "#205295", "#439A97", "#68B984"];

export default function Page() {
  const posts = getAllPostsProps();

  return (
    <div className='frame w-full flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Blog</h1>
        <p className='w-full max-w-xl text-center text-xl text-gray-500'>
          This blog page includes posts I wrote about my stacks or my experience. Hope you like it.
        </p>
      </div>
      <div className='flex flex-col w-full max-w-4xl gap-5'>
        <h1 className='text-gray-700 font-bold text-3xl'>All blogs</h1>
        {posts.map((item, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <Link href={`/blog`} className='text-2xl text-blue-600 hover:underline'>
              {item.title}
            </Link>
            <div className='flex flex-row items-center gap-2 text-gray-500 '>
              <div className='flex flex-row items-center'>
                <FaRegClock size={15} />
                <p>{item.date}</p>
              </div>
              {item.tags.map((tag, index) => (
                <div key={index} style={{ color: colorfulColors[index], fontWeight: "bold" }}>
                  #{tag}
                </div>
              ))}
            </div>
            <div className='flex flex-row items-center gap-1 text-gray-700 text-xl'>{item.intro}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
