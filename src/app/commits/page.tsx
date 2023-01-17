import { readCommits } from "../../lib/commits";

export default async function Page() {
  const commits = await readCommits();

  return (
    <div className='frame w-full'>
      <div className='flex flex-col gap-2'>
        {commits.map((item, index) => (
          <div key={index}>
            <h1>
              {item.date}(共{item.count}个提交)
            </h1>
            <div>
              {item.data.map((item, index) => (
                <div key={index} className='flex flex-row gap-1'>
                  <span>{item.date}</span>
                  <span>{item.message}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
