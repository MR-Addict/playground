import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

import { getMetadata } from "@/lib/utils";
import { Capture, Result, CaptureContextProvider } from "./components";

export const metadata = getMetadata("Capture Website • Tools");

export default function Page() {
  return (
    <main
      aria-label='website capture page'
      className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'
    >
      <Link
        href='/tools'
        aria-label='go back to tools'
        className='hidden md:block h-fit duration-300 text-gray-700 hover:text-blue-600'
      >
        <ImArrowLeft2 size={20} />
      </Link>
      <CaptureContextProvider>
        <div className='w-full flex flex-col items-center gap-5'>
          <header className='text-3xl text-center text-gray-700 font-bold'>Capture Website</header>
          <Capture />
          <Result />
        </div>
      </CaptureContextProvider>
      <span></span>
    </main>
  );
}
