import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";

import { NormalNavbar, MobileNavbar, Login } from "./components";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Navbar() {
  const session = await unstable_getServerSession(authOptions);

  return (
    <div className='w-full flex flex-row items-center justify-between px-5 md:px-48 py-5 shadow-md relative bg-gray-900'>
      <Link href='/' className='text-green-400 text-xl md:text-2xl font-bold italic'>
        Playground
      </Link>
      <div className='hidden lg:flex flex-row items-center gap-4'>
        <NormalNavbar />
        <Login session={session} />
      </div>
      <div className='lg:hidden flex flex-row items-center gap-4'>
        <Login session={session} />
        <MobileNavbar />
      </div>
    </div>
  );
}
