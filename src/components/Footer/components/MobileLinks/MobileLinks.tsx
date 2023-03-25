import { links } from "../../config";
import LinkCard from "../LinkCard/LinkCard";

export default function MobileLinks() {
  return (
    <ul className='md:hidden flex w-full flex-col items-start justify-between gap-5'>
      {links.map((item1, index1) => (
        <li key={index1} className='flex flex-col gap-2 w-full'>
          <h1 className='text-gray-700'>{item1.head}</h1>
          <div className='grid gap-1 grid-cols-2'>
            {item1.data.map((item2, index2) => (
              <LinkCard link={item2} key={index2} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
