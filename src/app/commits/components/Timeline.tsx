import { commitType } from "../lib/fetchCommits";
import { FaDotCircle, FaRegClock } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

export default function Timeline({
  totalCount,
  commits,
}: {
  totalCount: number;
  commits: { date: string; count: number; data: commitType[] }[];
}) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-2xl font-bold text-slate-700'>开发日志({totalCount}条日志)</h1>
      <div className='flex flex-col gap-5'>
        {commits.map((item1, index1) => (
          <div key={index1} className='flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <span className='text-green-600'>
                <FaDotCircle size={15} />
              </span>
              <span className='text-gray-700 font-semibold'>
                {item1.date}({item1.count}条日志)
              </span>
            </div>
            <div className='flex flex-col border border-green-600 rounded-md'>
              {item1.data.map((item2, index2) => (
                <div
                  key={index2}
                  className={`flex flex-col p-2 border-b-gray-400 hover:bg-gray-100 duration-100 ${
                    index2 === item1.count - 1 ? "border-b-0" : "border-b"
                  }`}
                >
                  <div className=' text-gray-700 flex flex-row items-center gap-1'>
                    <span>
                      <FaRegClock size={14} />
                    </span>
                    <h1>{item2.date}</h1>
                  </div>
                  <div className=' text-slate-800 flex flex-row items-center gap-1'>
                    <span>
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
    </div>
  );
}
