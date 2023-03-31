import Generator from "./Generator";
import { Back } from "@/components";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("Tools • Password Generator");

export default function Page() {
  return (
    <main aria-label='password generator page' className='frame w-full'>
      <Back link='/tools'>
        <Generator />
      </Back>
    </main>
  );
}
