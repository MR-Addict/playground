import { FaRegClock } from "react-icons/fa";

import { Tooltip } from "@/components";
import fetchMoments from "./fetchMoments";
import TimeAgo from "@/components/TimeAgo/TimeAgo";
import { AddButton, EditButton, DeleteButton, GetWeatherIcon } from "./components";

export const revalidate = 0;

export const metadata = {
  title: "Moments • Playground",
  icons: { icon: "/favicon.ico" },
};

export default async function Page() {
  const moments = await fetchMoments();

  return (
    <section className='w-full flex flex-col gap-5'>
      {moments.data.map((item1, index) => (
        <div key={item1.category} className='flex flex-col gap-1'>
          <div className='flex flex-row items-center gap-1'>
            <span className='block w-3 h-3 bg-purple-600 rounded-full'></span>
            <h1 className='text-lg'>{item1.category}</h1>
            {index === 0 && <AddButton />}
          </div>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {item1.data.map((item2) => (
              <li
                key={item2._id}
                className='background flex flex-col p-3 rounded-md shadow-md outline outline-1 outline-green-600 group'
              >
                <div className='flex flex-row items-center gap-2'>
                  <Tooltip title={item2.date}>
                    <div className='flex flex-row items-center gap-2 cursor-pointer'>
                      <div className='flex flex-row items-center gap-[1px]'>
                        <FaRegClock size={12} />
                        <span>{item2.date.split(" ")[0]}</span>
                      </div>
                      <TimeAgo date={item2.date} />
                    </div>
                  </Tooltip>
                  <Tooltip title={item2.weather}>
                    <span className='cursor-pointer'>{<GetWeatherIcon weather={item2.weather} />}</span>
                  </Tooltip>
                  <EditButton moment={item2} />
                  <DeleteButton _id={item2._id} />
                </div>
                <span>{item2.moment}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
