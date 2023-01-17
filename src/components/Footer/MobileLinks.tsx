import LinkCard from "./LinkCard";
import { links } from "./config";

export default function MobileLinks() {
  return (
    <div className='md:hidden flex w-full flex-col items-start justify-between gap-5'>
      {links.map((item1, index1) => (
        <div key={index1} className='flex flex-col gap-2 w-full'>
          <h1 className='dark:text-white'>{item1.head}</h1>
          <div className='dark:text-gray-400 dark:hover:text-gray-200 grid gap-1 grid-cols-2'>
            {item1.data.map((item2, index2) => (
              <LinkCard item={item2} key={index2} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
