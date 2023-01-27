import Image from "next/image";

import readPackages from "./readPackages";

export default async function Page() {
  const packages = await readPackages();

  return (
    <div className='frame w-full flex flex-col gap-5'>
      <h1 className='text-slate-700 font-bold text-2xl'>Packages</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
        {packages.map((item, index) => (
          <div
            key={index}
            className='w-full h-full flex flex-col items-center rounded-xl shadow-md border-2 border-green-600 duration-300 md:hover:shadow-xl md:hover:scale-95 md:hover:-skew-y-1 transform-gpu'
          >
            <span className='text-green-900 text-3xl font-bold border-b-2 border-b-green-600 bg-green-600/30 w-full rounded-t-xl py-3 text-center duration-300'>
              {item.name}
            </span>
            <div className='w-full flex flex-col items-center gap-3 py-7'>
              <Image src={item.img} alt='icon' placeholder='blur' className='w-2/3 sm:w-1/2 aspect-square' />
              <span className='text-2xl text-center text-green-700'>{item.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
