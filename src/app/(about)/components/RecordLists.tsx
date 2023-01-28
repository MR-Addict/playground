import { FaDotCircle, FaRegClock } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

interface recordsType {
  date: string;
  count: number;
  data: {
    date: string;
    message: any;
  }[];
}

export default function RecordLists({ records }: { records: recordsType[] }) {
  return (
    <div className='flex flex-col gap-5'>
      {records.map((item1, index1) => (
        <div key={index1} className='flex flex-col gap-1'>
          <div className='flex flex-row items-center gap-2'>
            <span className='text-green-600'>
              <FaDotCircle size={15} />
            </span>
            <span className='text-gray-700 font-semibold'>
              {item1.date}({item1.count})
            </span>
          </div>
          <div className='flex flex-col border border-green-600 rounded-md'>
            {item1.data.map((item2, index2) => (
              <div
                key={index2}
                className={`flex flex-col p-2 border-b-gray-400 ${
                  index2 === item1.count - 1 ? "border-b-0" : "border-b"
                }`}
              >
                <div className=' text-gray-700 flex flex-row items-center'>
                  <span className='pr-1'>
                    <FaRegClock size={15} />
                  </span>
                  <h1>{item2.date}</h1>
                </div>
                <div className=' text-slate-700 flex flex-row items-center'>
                  <span className='pr-[1.5px]'>
                    <HiOutlineChatBubbleOvalLeftEllipsis size={17} />
                  </span>
                  <span>{item2.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
