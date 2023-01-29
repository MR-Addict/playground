import Link from "next/link";

import { NormalNavbar, MobileNavbar, Login } from "./components";

export default async function Navbar() {
  return (
    <nav aria-label='navbar' className='py-5 px-5 md:px-48 w-full flex flex-row items-center justify-between'>
      <Link href='/' className='text-green-600 text-xl md:text-2xl font-bold'>
        Playground
      </Link>
      <div className='flex flex-row items-center gap-5 md:gap-7'>
        <NormalNavbar />
        <Login />
        <MobileNavbar />
      </div>
    </nav>
  );
}
