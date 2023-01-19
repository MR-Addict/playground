import Link from "next/link";

import { NormalNavbar, MobileNavbar, Login } from "./components";

export default async function Navbar() {
  return (
    <div className='w-full flex flex-row items-center justify-between px-5 md:px-48 py-5 relative bg-gray-900'>
      <Link href='/' className='text-green-400 text-xl md:text-2xl font-bold italic'>
        Playground
      </Link>
      <div className='hidden lg:flex flex-row items-center gap-7'>
        <NormalNavbar />
        <Login />
      </div>
      <div className='lg:hidden flex flex-row items-center gap-7'>
        <Login />
        <MobileNavbar />
      </div>
    </div>
  );
}
