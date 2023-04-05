function SkeletonCard() {
  return (
    <div className='flex flex-col items-start gap-3 p-3 rounded-md border border-gray-300 animate-pulse'>
      <div className='h-4 w-1/2 bg-slate-200 rounded-md'></div>
      <div className='h-32 w-full bg-slate-200 rounded-md'></div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {Array.from(Array(6)).map((item2, index2) => (
        <SkeletonCard key={index2} />
      ))}
    </section>
  );
}
