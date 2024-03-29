function SkeletonCard() {
  return (
    <div className="flex flex-col items-start gap-3 p-3 rounded-md border border-gray-300 animate-pulse">
      <div className="h-4 w-1/2 bg-slate-200 rounded-md"></div>
      <div className="h-24 w-full bg-slate-200 rounded-md"></div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      {Array.from(Array(2)).map((item1, index1) => (
        <div key={index1} className="flex flex-col gap-3">
          <div className="h-4 w-28 bg-slate-200 rounded-md animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from(Array(6)).map((item2, index2) => (
              <SkeletonCard key={index2} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
