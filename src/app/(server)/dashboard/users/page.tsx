import { redirect } from "next/navigation";

import { setMetadata } from "@/lib/utils";
import { checkPerm } from "@/lib/auth/checkPerm";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Dashboard • Users");

export default async function Page() {
  const session = await pageSession();
  const userPermission = checkPerm(session?.user.role || "vistor", "admin");
  if (!userPermission) redirect("/");

  return (
    <section aria-label='admin page' className='w-full'>
      <h1>Users Page</h1>
    </section>
  );
}
