import { Copyright, NormalLinks, MobileLinks } from "./components";

export default function Footer() {
  return (
    <footer aria-label="footer" className="w-full frame flex flex-col gap-10 items-start justify-between">
      <NormalLinks />
      <MobileLinks />
      {/* @ts-expect-error */}
      <Copyright />
    </footer>
  );
}
