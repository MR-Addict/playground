import SignupForm from "./SignupForm";
import { Back, PageWrapper } from "@/components";
import { redirect } from "next/navigation";
import { setMetadata } from "@/lib/utils";

import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Signup");

export default async function Page() {
  const session = await pageSession();
  if (session) redirect("/");

  return (
    <PageWrapper className='frame w-full'>
      <Back link='/'>
        <SignupForm />
      </Back>
    </PageWrapper>
  );
}
