import { SpinLoader } from "@/components";

export default function Loading() {
  return (
    <section aria-label='loading animation' className='frame flex flex-col items-center w-full gap-1'>
      <SpinLoader size='2rem' />
      <p className='font-semibold text-salte-700 text-xl'>Loading...</p>
    </section>
  );
}
