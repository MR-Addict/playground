import { Session } from "next-auth";

import EmailForm from "./EmailForm";
import UsernameForm from "./UsernameForm";

export default function AccountForm({ session }: { session: Session }) {
  return (
    <section aria-label='account form' className='w-full flex flex-col gap-5'>
      <UsernameForm session={session} />
      <EmailForm session={session} />
    </section>
  );
}
