import { links } from "../config";
import LinkCard from "./LinkCard";

export default function NormalLinks() {
  return (
    <div className='hidden md:flex w-full flex-row items-start justify-between'>
      {links.map((item1, index1) => (
        <div key={index1} className='flex flex-col gap-5'>
          <h1 className='dark:text-white'>{item1.head}</h1>
          <div className='flex flex-col gap-1'>
            {item1.data.map((item2, index2) => (
              <LinkCard item={item2} key={index2} />
            ))}
          </div>
        </div>
      ))}
      <h1 className='text-green-600 text-2xl font-bold italic'>Playground</h1>
    </div>
  );
}
