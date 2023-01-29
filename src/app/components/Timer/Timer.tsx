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
  const runtimeStart = process.env.RUNTIME_START || "";
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
        <Segment title='Years' number={runtime.years} />
        <Segment title='Months' number={runtime.months} />
        <Segment title='Days' number={runtime.days} />
        <Segment title='Hours' number={runtime.hours} />
        <Segment title='Minutes' number={runtime.minutes} />
        <Segment title='Seconds' number={runtime.seconds} />
      </div>
      <h1 className='text-xl text-gray-500'>Since {formatDate(runtimeStart)}</h1>
    </section>
  );
}
