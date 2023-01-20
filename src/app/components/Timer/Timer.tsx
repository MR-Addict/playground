"use client";

import { useState, useEffect } from "react";

import Segment from "./Segment";
import { formatDate, calculateRuntime } from "@/lib/utils";

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
    <div className='py-16 md:py-24 px-5 md:px-48 w-full flex flex-col items-center gap-10 md:gap-14 bg-gray-100'>
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
