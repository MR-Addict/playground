function SkeletonCard() {
  return (
    <div className='flex flex-col items-start gap-3 p-3 rounded-md border border-gray-300 animate-pulse'>
      <div className='h-4 w-1/2 bg-slate-200 rounded-md'></div>
      <div className='h-16 w-full bg-slate-200 rounded-md'></div>
    </div>
  );
}

export default function Page() {
  return (
    <div className='frame w-full flex flex-col gap-7'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Moments</h1>
        <p className='text-xl text-gray-500'>I like to write daily moments of my life. Here is a collection of them.</p>
      </header>

      <section className='flex flex-col gap-3'>
        <div className='h-4 w-28 bg-slate-200 rounded-md'></div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </div>
  );
}
