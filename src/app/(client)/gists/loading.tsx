function SkeletonCard() {
  return (
    <div className='flex flex-col items-start gap-2 animate-pulse'>
      <div className='h-4 w-1/3 bg-slate-200 rounded-md'></div>
      <div className='h-72 w-full p-3 rounded-md border border-gray-300'>
        <div className='w-full h-full rounded-md bg-slate-200'></div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className='w-full flex flex-col gap-10'>
      {Array.from(Array(2)).map((item2, index2) => (
        <SkeletonCard key={index2} />
      ))}
    </section>
  );
}
