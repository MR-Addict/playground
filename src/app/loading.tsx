import { SpinLoader } from "@/components";

export default function Loading() {
  return (
    <main aria-label='loading animation' className='frame flex flex-col items-center w-full gap-1'>
      <SpinLoader size='35' color='#16a34a' />
      <p className='font-semibold text-salte-700 text-xl'>Loading...</p>
    </main>
  );
}
