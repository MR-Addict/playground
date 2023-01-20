import Link from "next/link";

import { NormalNavbar, MobileNavbar, Login } from "./components";

export default async function Navbar() {
  return (
    <div className='py-5 px-5 md:px-48 w-full flex flex-row items-center justify-between'>
      <Link href='/' className='text-green-600 text-xl md:text-2xl font-bold italic'>
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
