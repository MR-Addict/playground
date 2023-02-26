import { unstable_getServerSession } from "next-auth";

import { MomentContextProvider } from "./components";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return <main className='w-fit'>You got no access to this page!</main>;

  return (
    <main aria-label='moments page' className='frame w-full flex flex-col gap-7'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Moments</h1>
        <p className='text-xl text-gray-500'>I like to write daily moments of my life. Here is a collection of them.</p>
      </header>
      <MomentContextProvider>{children}</MomentContextProvider>
    </main>
  );
}
