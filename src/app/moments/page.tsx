import { FaRegClock } from "react-icons/fa";

import { Tooltip } from "@/components";
import fetchMoments from "./fetchMoments";
import EditButton from "./EditButton";
import GetWeatherIcon from "./GetWeatherIcon";

export default function Page() {
  const moments = fetchMoments();

  return (
    <main aria-label='moments page' className='frame w-full flex flex-col items-center gap-5'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Moments</h1>
        <p className='text-xl text-gray-500'>I like to write daily moments of my life. Here is a collection of them.</p>
      </header>
      <section className='w-full flex flex-col gap-5'>
        {moments.data.map((item1) => (
          <div key={item1.category} className='flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-1'>
              <span className='block w-3 h-3 bg-purple-600 rounded-full'></span>
              <h1 className='text-lg'>{item1.category}</h1>
            </div>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {item1.data.map((item2) => (
                <li
                  key={item2.id}
                  className='background flex flex-col gap-2 p-5 rounded-md shadow-md outline outline-1 outline-green-600 group'
                >
                  <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-row items-center gap-[1px]'>
                      <FaRegClock size={12} />
                      <span>{item2.date}</span>
                    </div>
                    <span className='cursor-pointer'>
                      <Tooltip title={item2.weather}>{<GetWeatherIcon weather={item2.weather} />}</Tooltip>
                    </span>
                    <EditButton moment={item2} />
                  </div>
                  <span>{item2.moment}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
