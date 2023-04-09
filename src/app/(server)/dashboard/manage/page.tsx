import { redirect } from "next/navigation";

import UsersTable from "./UsersTable";
import { user } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";
import { checkPerm } from "@/lib/auth/checkPerm";
import { pageSession } from "@/lib/auth/serverSession";
import { DeletePopupContextProvider, RolePopupContextProvider } from "./components";

export const metadata = setMetadata("Dashboard • Manage");

export default async function Page() {
  const session = await pageSession();
  const userPermission = checkPerm(session?.user.role || "vistor", "admin");
  if (!session || !userPermission) redirect("/");

  const result = await user.read();
  if (!result.status || !result.data) throw new Error(result.message);

  const users = result.data;

  return (
    <section aria-label='manager user page' className='w-full flex flex-col gap-2'>
      <h1 className='text-xl font-semibold text-gray-700'>Manage Users</h1>

      <RolePopupContextProvider session={session}>
        <DeletePopupContextProvider>
          <UsersTable users={users} />
        </DeletePopupContextProvider>
      </RolePopupContextProvider>
    </section>
  );
}
