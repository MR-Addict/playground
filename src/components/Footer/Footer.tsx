import { Copyright, NormalLinks, MobileLinks } from "./components";

export default function Footer() {
  return (
    <footer className='w-full frame flex flex-col gap-10 items-start justify-between'>
      <NormalLinks />
      <MobileLinks />
      <Copyright />
    </footer>
  );
}
