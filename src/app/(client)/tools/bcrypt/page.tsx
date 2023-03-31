import { Back } from "@/components";
import BcryptForm from "./BcryptForm";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("Tools • Bcrypt");

export default function Page() {
  return (
    <main aria-label='bcrypt page' className='frame w-full'>
      <Back link='/tools'>
        <BcryptForm />
      </Back>
    </main>
  );
}
