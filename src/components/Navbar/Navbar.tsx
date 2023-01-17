import Link from "next/link";

import NavbarButtons from "./NavbarButtons";

export default function Navbar() {
  return (
    <div className='w-full flex flex-row items-center justify-between px-5 md:px-48 py-5'>
      <Link href='/' className='dark:text-white text-xl md:text-2xl font-bold italic'>
        Playground
      </Link>
      {/* @ts-expect-error */}
      <NavbarButtons />
    </div>
  );
}
