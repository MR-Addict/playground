import { formatDate, calculateRuntime } from "@/lib/utils";

function Runtime() {
  const {
    start,
    runtime: { days },
  } = calculateRuntime();
  return (
    <div>
      Run over {days} days, since {formatDate(start).split(" ")[0]}.
    </div>
  );
}

function Platform() {
  return (
    <div className='flex flex-row gap-1'>
      <span>Powered by</span>
      <a href='https://vercel.com/' target='_blank' className='underline'>
        vercel
      </a>
      <span>and</span>
      <a href='https://www.mongodb.com/atlas/database' target='_blank' className='underline'>
        mongodb
      </a>
      <span>.</span>
    </div>
  );
}

export default function Copyright() {
  return (
    <div className='text-white w-full flex flex-col md:flex-row justify-between gap-2'>
      <div className='flex flex-col md:flex-row gap-1 md:gap-2'>
        <div>Copyright &copy; {new Date().getFullYear()}.</div>
        <Platform />
        <Runtime />
      </div>
    </div>
  );
}
