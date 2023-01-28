import Link from "next/link";
import { FaShare } from "react-icons/fa";

import { linkItemType } from "../config";

export default function LinkCard({ link }: { link: linkItemType }) {
  if (link.isLocal)
    return (
      <Link href={link.link} className='text-gray-500 hover:text-gray-700 flex flex-row gap-1 items-center w-fit'>
        <h1>{link.title}</h1>
      </Link>
    );
  return (
    <a
      target='_blank'
      href={link.link}
      className='text-gray-500 hover:text-gray-700 flex flex-row gap-2 items-center w-fit'
    >
      <h1>{link.title}</h1>
      <FaShare size={10} />
    </a>
  );
}
