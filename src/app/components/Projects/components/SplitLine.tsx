export default function SplitLine() {
  return (
    <div className='flex flex-row md:flex-col items-center gap-2'>
      <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
      <div className='border-2 border-gray-500 w-3 h-3 rounded-full'></div>
      <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
    </div>
  );
}
