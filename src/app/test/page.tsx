function SkeletonCard() {
  return (
    <div className='w-full px-4 pt-4 flex flex-col gap-2'>
      <div className='h-4 w-20 bg-slate-200 rounded-md'></div>
      <div className='h-7 w-full bg-slate-200 rounded-md'></div>
    </div>
  );
}

export default function Page() {
  return (
    <div className='frame w-full flex flex-col gap-5'>
      <div className='h-5 w-28 bg-slate-200 rounded-md animate-pulse'></div>
      <div className='rounded-md border border-gray-300 pb-4 animate-pulse'>
        {Array.from(Array(10)).map((item, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
