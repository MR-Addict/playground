import { redirect } from "next/navigation";

import SignupForm from "./SignupForm";
import { setMetadata } from "@/lib/utils";
import { pageSession } from "@/lib/auth/serverSession";
import { Back, PageWrapper } from "@/components/client";

export const metadata = setMetadata("Signup");

export default async function Page() {
  const session = await pageSession();
  if (session) redirect("/");

  return (
    <PageWrapper className="frame w-full">
      <Back link="/">
        <SignupForm />
      </Back>
    </PageWrapper>
  );
}
