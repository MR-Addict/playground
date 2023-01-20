"use client";

import { useState, useEffect } from "react";

import { formatDate, calculateRuntime } from "@/lib/utils";

function OneSegment({ count }: { count: number }) {
  return (
    <div className='relative w-8 md:w-11 h-12 md:h-20 overflow-hidden text-gray-700 font-extrabold text-center text-5xl md:text-7xl '>
      <div
        style={{ transform: `translateY(-${count}0%)` }}
        className={`absolute top-0 left-0 flex flex-col duration-500`}
      >
        {Array.from(Array(10)).map((item, index) => (
          <span key={index} className='w-8 md:w-11 h-12 md:h-20'>
            {index}
          </span>
        ))}
      </div>
    </div>
  );
}

function Segment({ title, number }: { title: string; number: number }) {
  const segments = (number < 10 ? "0" + number : String(number)).split("");

  return (
    <div className='flex flex-col w-fit'>
      <div className='flex flex-row justify-center gap-4 p-5 rounded-t-xl bg-white drop-shadow-lg'>
        {segments.map((item, index) => (
          <OneSegment key={index} count={Number(item)} />
        ))}
      </div>
      <h1 className='bg-green-600 z-10 drop-shadow-lg text-center py-3 w-full rounded-b-xl text-white text-2xl md:text-3xl font-bold'>
        {title}
      </h1>
    </div>
  );
}

function useInterval(callback: Function, delay: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay || 0);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

export default function Timer() {
  const initRuntime = calculateRuntime();
  const [runtime, setRuntime] = useState(initRuntime.runtime);

  useInterval(() => setRuntime(calculateRuntime().runtime), 1000);

  return (
    <div className='frame w-full flex flex-col items-center gap-10 md:gap-14 bg-gray-100'>
      <h1 className='text-gray-700 text-3xl md:text-5xl font-bold text-center'>Playground Has Run</h1>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-10'>
        <Segment title='Years' number={runtime.years} />
        <Segment title='Months' number={runtime.months} />
        <Segment title='Days' number={runtime.days} />
        <Segment title='Hours' number={runtime.hours} />
        <Segment title='Minutes' number={runtime.minutes} />
        <Segment title='Seconds' number={runtime.seconds} />
      </div>
      <h1 className='text-xl text-gray-500'>Since {formatDate(initRuntime.start)}</h1>
    </div>
  );
}
