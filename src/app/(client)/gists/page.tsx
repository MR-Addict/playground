import { HiOutlineCodeBracketSquare } from "react-icons/hi2";

import gists from "./config";
import serializeGist from "@/lib/gist";
import { setMetadata } from "@/lib/utils";
import { Gist, TimeAgo, PageWrapper } from "@/components/client";

export const metadata = setMetadata("Gists");

export default async function Page() {
  const data = await Promise.all(gists.map((gist) => serializeGist(gist)));

  return (
    <PageWrapper className='frame w-full flex flex-col gap-7'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Gists</h1>
        <p className='w-full max-w-xl text-xl text-gray-500'>
          Here is some useful gists I think I may easily forget. So I put theme there for quick look.
        </p>
      </header>

      <div className='w-full flex flex-col gap-10'>
        {data.map((gist) => (
          <div key={gist.id}>
            <div className='flex items-start flex-row gap-1'>
              <div className='w-3 h-3 border-4 border-green-600 rounded-full mt-2'></div>

              <div className='flex flex-col md:flex-row md:items-center md:gap-1'>
                <h1 className='text-lg text-gray-700'>{gist.description}</h1>

                <div className='flex flex-row items-center gap-0.5'>
                  <p className='text-sm text-gray-500'>
                    Last update <TimeAgo date={gist.updated_at} />
                  </p>
                  <a
                    href={gist.html_url}
                    target='_blank'
                    aria-label='gist link'
                    className='text-gray-500 mt-1 hover:text-blue-600'
                  >
                    <HiOutlineCodeBracketSquare size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              {gist.files.map((item) => (
                <Gist key={item.filename} serializedMDX={item.serializedMDX} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
