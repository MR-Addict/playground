import { Copyright, NormalLinks, MobileLinks } from "./components";

export default function Footer() {
  return (
    <footer className='dark:bg-gray-700 w-full frame bg-gray-100 flex flex-col gap-10 md:gap-20 items-start justify-between'>
      <NormalLinks />
      <MobileLinks />
      <Copyright />
    </footer>
  );
}
