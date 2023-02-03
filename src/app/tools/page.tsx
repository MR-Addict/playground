import Link from "next/link";

import tools from "./config";
import { colorfulColors } from "@/lib/utils";

export default function Page() {
  return (
    <main aria-label='tools page' className='frame w-full flex flex-col items-center gap-10'>
      <header aria-label='title' className='flex flex-col items-center gap-3'>
        <h1 className='text-3xl text-center text-gray-700 font-bold'>Available Tools</h1>
        <p className='text-center w-full max-w-xl text-xl text-gray-500'>
          These are all kinds of tools that I may use in my daily life. Hope they can be helpful to you too.
        </p>
      </header>
      <section aria-label='all blogs' className='grid grid-cols-1 md:grid-cols-2 gap-16'>
        {tools.map((item, index) => (
          <div
            key={index}
            className='background flex flex-col justify-between gap-5 px-7 py-5 rounded-md shadow-lg border-t-4 md:hover:translate-y-2 md:hover:shadow-2xl duration-300 group'
            style={{ borderColor: colorfulColors[index % colorfulColors.length] }}
          >
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-bold text-gray-700'>{item.name}</span>
              <span className='text-xl text-gray-500'>{item.intro}</span>
            </div>
            <div className='flex flex-row items-center justify-between'>
              <Link
                href={item.link}
                style={{ backgroundColor: colorfulColors[index % colorfulColors.length] }}
                className='rounded-md py-3 px-7 text-xl font-bold text-white shadow-lg md:translate-y-7 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 duration-500 transform-gpu'
              >
                Have a try
              </Link>
              <span style={{ color: colorfulColors[index % colorfulColors.length] }}>{<item.icon size={70} />}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
