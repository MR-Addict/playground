import { FaShare } from "react-icons/fa";

import { linkItemType } from "../config";

export default function LinkCard({ item }: { item: linkItemType }) {
  return (
    <a href={item.link} target='_blank' className='text-gray-300 hover:text-gray-100 flex flex-row gap-1 items-center'>
      <h1>{item.title}</h1>
      {!item.isLocal && <FaShare size={10} />}
    </a>
  );
}
