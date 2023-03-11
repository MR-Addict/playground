"use client";

import { useState, useEffect } from "react";

import Segment from "./Segment";
import { formatDate, timeAgo } from "@/lib/utils";

function useInterval(callback: Function, delay: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay || 0);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

export default function Timer() {
  const runtimeStart = "2023-01-17T07:00:19Z";
  const initRuntime = timeAgo(runtimeStart);

  const [runtime, setRuntime] = useState(initRuntime);

  useInterval(() => setRuntime(timeAgo(runtimeStart)), 1000);

  return (
    <section
      aria-label='timer part'
      className='py-16 md:py-24 px-5 md:px-48 w-full flex flex-col items-center gap-10 md:gap-14'
    >
      <h1 className='text-gray-700 text-3xl md:text-5xl font-bold text-center'>Playground has run</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10'>
        <Segment title='Years' number={runtime.year} />
        <Segment title='Months' number={runtime.month} />
        <Segment title='Days' number={runtime.day} />
        <Segment title='Hours' number={runtime.hour} />
        <Segment title='Minutes' number={runtime.minute} />
        <Segment title='Seconds' number={runtime.second} />
      </div>
      <h1 className='text-xl text-gray-500'>Since {formatDate(runtimeStart)}</h1>
    </section>
  );
}
