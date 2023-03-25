import Link from "next/link";
import { ImArrowLeft2 } from "react-icons/im";

export default function Back() {
  return (
    <Link href='/tools' aria-label='go back to tools' className='hidden md:block h-fit duration-300 text-blue-600'>
      <ImArrowLeft2 size={20} />
    </Link>
  );
}
