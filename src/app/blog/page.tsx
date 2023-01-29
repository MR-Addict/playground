import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

import { getAllPostsProps } from "@/lib/blog";
import { colorfulColors } from "@/lib/utils";

export default function Page() {
  const posts = getAllPostsProps();

  return (
    <main aria-label='blog page' className='frame w-full flex flex-col items-center gap-10'>
      <header aria-label='title' className='flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Blog</h1>
        <p className='w-full max-w-xl text-center text-xl text-gray-500'>
          This blog page includes posts I wrote about my stacks or my experience. Hope you like it.
        </p>
      </header>
      <section aria-label='all blogs' className='flex flex-col w-full max-w-3xl gap-3'>
        <h1 className='text-gray-700 font-bold text-2xl ml-3'>All Blogs</h1>
        <div className='flex flex-col w-full gap-5'>
          {posts.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-start gap-2 background drop-shadow-md p-3 rounded-md md:hover:drop-shadow-xl cursor-pointer md:hover:translate-y-1 duration-300'
            >
              <Link href={`/blog/${item.id}`} className='text-xl text-blue-600 hover:underline'>
                {item.title}
              </Link>
              <div className='flex text-sm flex-col md:flex-row md:items-center md:gap-2 text-gray-500'>
                <div className='flex flex-row items-center gap-1'>
                  <FaRegClock size={13} />
                  <p>{item.date}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  {item.tags.map((tag, index) => (
                    <div key={index} style={{ color: colorfulColors[index], fontWeight: "bold" }}>
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-row items-center gap-1 text-gray-500'>{item.intro}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
