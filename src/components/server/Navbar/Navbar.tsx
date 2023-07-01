import { ClientLink } from "@/components/client";
import { NormalNavbar, MobileNavbar, Login } from "./components";

export default function Navbar() {
  return (
    <nav aria-label="navbar" className="py-5 px-5 md:px-48 w-full flex flex-row items-center justify-between">
      <ClientLink href="/" className="text-green-600 text-xl md:text-2xl font-bold">
        Playground
      </ClientLink>

      <div className="flex flex-row items-center gap-4">
        <NormalNavbar />
        <Login />
        <MobileNavbar />
      </div>
    </nav>
  );
}
