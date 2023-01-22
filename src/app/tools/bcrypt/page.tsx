import Link from "next/link";
import { BiChevronsLeft } from "react-icons/bi";

import BcryptForm from "./BcryptForm";

export default function Page() {
  return (
    <div className='frame w-full flex flex-row justify-between gap-5 md:gap-10'>
      <Link href='/tools' className='flex flex-row items-center h-fit duration-300 hover:text-blue-600'>
        <BiChevronsLeft />
        <h1>Back</h1>
      </Link>
      <BcryptForm />
      <span></span>
    </div>
  );
}
