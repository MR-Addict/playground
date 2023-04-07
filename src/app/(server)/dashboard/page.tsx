import { redirect } from "next/navigation";

import { setMetadata } from "@/lib/utils";
import { AccountForm } from "./components";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Dashboard • Account");

export default async function Page() {
  const session = await pageSession();
  if (!session) redirect("/");

  return (
    <section aria-label='account page' className='w-full'>
      <AccountForm session={session} />
    </section>
  );
}
