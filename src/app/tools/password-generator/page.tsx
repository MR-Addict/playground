import Generator from "./Generator";
import { Back } from "../components";
import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("Password Gernerator • Tools");

export default function Page() {
  return (
    <main
      aria-label='password generator page'
      className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'
    >
      <Back />
      <Generator />
      <span></span>
    </main>
  );
}
