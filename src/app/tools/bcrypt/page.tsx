import { Back } from "../components";
import BcryptForm from "./BcryptForm";
import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("Bcrypt • Tools");

export default function Page() {
  return (
    <main
      aria-label='bcrypt page'
      className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'
    >
      <Back />
      <BcryptForm />
      <span></span>
    </main>
  );
}
