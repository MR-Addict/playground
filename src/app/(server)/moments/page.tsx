import { FaRegClock } from "react-icons/fa";

import style from "./page.module.css";
import fetchMoments from "./fetchMoments";
import { setMetadata } from "@/lib/utils";
import { Tooltip, TimeAgo } from "@/components";
import { AddButton, CopyButton, EditButton, DeleteButton, GetWeatherIcon } from "./components";

export const metadata = setMetadata("Moments");

export default async function Page() {
  const moments = await fetchMoments();

  return (
    <ul className='w-full flex flex-col gap-5'>
      {moments.data.map((item1, index) => (
        <li key={item1.category} className='flex flex-col gap-1'>
          <div className='flex flex-row items-center gap-2'>
            <span className='block w-3 h-3 border-4 border-green-600 rounded-full'></span>
            <h1 className='text-lg'>{item1.category}</h1>
            {index === 0 && <AddButton />}
          </div>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {item1.data.map((item2) => (
              <li
                key={item2._id}
                className='background flex flex-col gap-1 p-3 rounded-md shadow-md border border-green-600 group'
              >
                <div className='flex flex-row items-center gap-2'>
                  <Tooltip title={item2.date}>
                    <div className='flex flex-row items-center gap-0.5 cursor-pointer'>
                      <FaRegClock size={12} />
                      <span>
                        {item2.date.split(" ")[0]}
                        (<TimeAgo date={item2.date} />)
                      </span>
                    </div>
                  </Tooltip>
                  <Tooltip title={`Today is ${item2.weather}`}>
                    <span className='cursor-pointer'>
                      <GetWeatherIcon weather={item2.weather} />
                    </span>
                  </Tooltip>
                  <CopyButton moment={item2.moment} />
                  <EditButton moment={item2} />
                  <DeleteButton _id={item2._id} />
                </div>
                <div className={style.spand}>
                  <input type='checkbox' id={item2._id} style={{ display: "none" }} />
                  <label htmlFor={item2._id} className='whitespace-pre-wrap'>
                    {item2.moment}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
