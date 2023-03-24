import Link from "next/link";

import { links } from "../config";
import LinkCard from "./LinkCard";

export default function NormalLinks() {
  return (
    <ul className='hidden md:flex w-full flex-row items-start justify-between'>
      {links.map((item1, index1) => (
        <li key={index1} className='flex flex-col gap-5'>
          <h1 className='text-gray-700'>{item1.head}</h1>
          <div className='flex flex-col gap-1'>
            {item1.data.map((item2, index2) => (
              <LinkCard link={item2} key={index2} />
            ))}
          </div>
        </li>
      ))}

      <Link href='/' className='text-green-600 text-2xl font-bold italic'>
        Playground
      </Link>
    </ul>
  );
}
