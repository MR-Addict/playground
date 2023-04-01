import BcryptForm from "./BcryptForm";
import { setMetadata } from "@/lib/utils";
import { Back, PageWrapper } from "@/components/client";

export const metadata = setMetadata("Tools • Bcrypt");

export default function Page() {
  return (
    <PageWrapper aria-label='bcrypt page' className='frame w-full'>
      <Back link='/tools'>
        <BcryptForm />
      </Back>
    </PageWrapper>
  );
}
