import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

import Generator from "./Generator";

export default function Page() {
  return (
    <div className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'>
      <Link
        href='/tools'
        aria-label='go back to tools'
        className='hidden md:block h-fit duration-300 text-gray-700 hover:text-blue-600'
      >
        <ImArrowLeft2 size={20} />
      </Link>
      <Generator />
      <span></span>
    </div>
  );
}
