import { ImArrowLeft2 } from "react-icons/im";

import { ClientLink } from "@/components/client";

export default function Back({ link = "/", children }: { link?: string; children: React.ReactNode }) {
  return (
    <section
      aria-label='back wrapper'
      className='w-full flex flex-col md:flex-row items-center md:items-start justify-between'
    >
      <ClientLink
        href={link}
        aria-label='go back to tools'
        className='hidden md:block h-fit duration-300 text-blue-600'
      >
        <ImArrowLeft2 size={20} />
      </ClientLink>
      {children}
      <span></span>
    </section>
  );
}
