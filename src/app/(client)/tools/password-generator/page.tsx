import Generator from "./Generator";
import { setMetadata } from "@/lib/utils";
import { Back, PageWrapper } from "@/components";

export const metadata = setMetadata("Tools • Password Generator");

export default function Page() {
  return (
    <PageWrapper aria-label='password generator page' className='frame w-full'>
      <Back link='/tools'>
        <Generator />
      </Back>
    </PageWrapper>
  );
}
