"use client";

function OneSegment({ count }: { count: number }) {
  return (
    <div className='relative w-8 md:w-11 h-12 md:h-20 overflow-hidden text-gray-700 font-extrabold text-center text-5xl md:text-7xl '>
      <div
        style={{ transform: `translateY(${count}0%)` }}
        className={`transform-gpu absolute bottom-0 left-0 flex flex-col duration-500`}
      >
        {Array.from(Array(10)).map((item, index) => (
          <span key={index} className='w-8 md:w-11 h-12 md:h-20 text-white'>
            {9 - index}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Segment({ title, number }: { title: string; number: number }) {
  const segments = (number < 10 ? "0" + number : String(number)).split("").map((item) => Number(item));

  return (
    <div className='flex flex-col w-fit bg-yellow-500 rounded-xl drop-shadow-xl'>
      <div className='flex flex-row justify-evenly pt-2 px-5'>
        <span className='w-3 h-3 rounded-full bg-white shadow-gray-500 shadow-inner'></span>
        <span className='w-3 h-3 rounded-full bg-white shadow-gray-500 shadow-inner'></span>
        <span className='w-3 h-3 rounded-full bg-white shadow-gray-500 shadow-inner'></span>
      </div>
      <div className='flex flex-row justify-center gap-4 p-5'>
        {segments.map((item, index) => (
          <OneSegment key={index} count={item} />
        ))}
      </div>
      <h1 className='bg-green-600 text-center py-3 w-full rounded-b-xl text-white text-2xl md:text-3xl font-bold'>
        {title}
      </h1>
    </div>
  );
}
