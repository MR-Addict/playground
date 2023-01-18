function Runtime() {
  const beginDay = "2023-01-17";
  const oneDay = 1000 * 60 * 60 * 24;
  const oneYear = oneDay * 365;
  const pastDays = Math.round((new Date().getTime() - new Date(beginDay).getTime()) / oneDay);
  const pastYears = Math.round(pastDays / oneYear);
  return (
    <div>
      Run over {pastYears !== 0 && `${pastYears} years and `} {pastDays} days, since {beginDay}.
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
      <div className='flex flex-col md:flex-row gap-1 md:gap-4'>
        <Platform />
        <Runtime />
        <div>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</div>
      </div>
    </div>
  );
}
