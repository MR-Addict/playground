import { PageWrapper } from "@/components/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className='frame w-full flex flex-col gap-7'>
      <header className='text-center flex flex-col items-center gap-3'>
        <h1 className='text-gray-700 font-bold text-3xl'>Gists</h1>
        <p className='w-full max-w-xl text-xl text-gray-500'>
          Here is some useful gists I think I may easily forget. So I put theme there for quick look.
        </p>
      </header>

      {children}
    </PageWrapper>
  );
}
