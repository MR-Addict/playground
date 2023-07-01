import { FaRegClock } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import { TimeAgo } from "@/components/client";

interface RecordsType {
  category: string;
  count: number;
  data: {
    date: string;
    message: string;
  }[];
}

export default function RecordLists({ records }: { records: RecordsType[] }) {
  return (
    <ul aria-label="record lists" className="flex flex-col gap-5">
      {records.map((item1, index1) => (
        <li key={index1} className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <span className="block w-3 h-3 border-4 border-green-600 rounded-full"></span>
            <span className="text-gray-700 font-semibold">
              {item1.category}({item1.count})
            </span>
          </div>
          <ul className="flex flex-col border border-green-600 rounded-md">
            {item1.data.map((item2, index2) => (
              <li
                key={index2}
                className={`flex flex-col items-start p-2 border-b-gray-400 ${
                  index2 === item1.count - 1 ? "border-b-0" : "border-b"
                }`}
              >
                <div className="text-slate-700 flex flex-row">
                  <span className="pr-1 pt-[6px]">
                    <FaRegClock size={14} />
                  </span>
                  <p>
                    {item2.date}
                    (<TimeAgo date={item2.date} />)
                  </p>
                </div>
                <div className="flex flex-row">
                  <span className="pr-[2px] pt-1">
                    <HiOutlineChatBubbleOvalLeftEllipsis size={17} />
                  </span>
                  <span>{item2.message}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
