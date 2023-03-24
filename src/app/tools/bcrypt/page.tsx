import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

import BcryptForm from "./BcryptForm";
import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("Bcrypt • Tools");

export default function Page() {
  return (
    <main
      aria-label='bcrypt page'
      className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'
    >
      <Link
        href='/tools'
        aria-label='go back to tools'
        className='hidden md:block h-fit duration-300 text-gray-700 hover:text-blue-600'
      >
        <ImArrowLeft2 size={20} />
      </Link>
      <BcryptForm />
      <span></span>
    </main>
  );
}
