import Image from "next/image";

import packageVersion from "./config";

export default function Page() {
  return (
    <div className='frame w-full flex flex-col gap-5'>
      <h1 className='text-slate-700 font-bold text-2xl'>版本信息</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {packageVersion.map((item, index) => (
          <div key={index} className='w-full h-full flex flex-col items-center rounded-xl border-2 border-green-500'>
            <span className='text-green-900 text-xl font-bold border-b-2 border-b-green-500 bg-green-500/30 w-full rounded-t-xl py-2 text-center duration-300'>
              {item.name}
            </span>
            <div className='w-full flex flex-col items-center gap-3 py-7'>
              <Image src={item.img} alt='icon' placeholder='blur' className='w-2/3 sm:w-1/2 aspect-square' />
              <span className='text-xl text-center text-green-700'>{item.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
