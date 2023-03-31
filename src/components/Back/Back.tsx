import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

export default function Back({ link = "/", children }: { link?: string; children: React.ReactNode }) {
  return (
    <section
      aria-label='back wrapper'
      className='w-full flex flex-col md:flex-row items-center md:items-start justify-between'
    >
      <Link href={link} aria-label='go back to tools' className='hidden md:block h-fit duration-300 text-blue-600'>
        <ImArrowLeft2 size={20} />
      </Link>
      {children}
      <span></span>
    </section>
  );
}
