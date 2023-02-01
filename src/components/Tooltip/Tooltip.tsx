export default function Tooltip({
  title,
  position = "top",
  children,
}: {
  title: string;
  position?: string;
  children: React.ReactNode;
}) {
  if (position === "top")
    return (
      <div
        className='before:border before:border-green-600 before:drop-shadow-xl relative before:z-10 before:absolute before:left-1/2 before:-top-2 before:w-max before:max-w-lg before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gradient-to-br before:from-blue-50 before:to-purple-50 before:px-2 before:py-1.5 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "bottom")
    return (
      <div
        className='before:border before:border-green-600 before:bg-gradient-to-br before:from-blue-50 before:to-purple-50 drop-shadow-xl relative before:z-10 before:absolute before:left-1/2 before:-bottom-2 before:w-max before:max-w-lg before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:px-2 before:py-1.5 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "right")
    return (
      <div
        className='before:border before:border-green-600 before:bg-gradient-to-br before:from-blue-50 before:to-purple-50 drop-shadow-xl relative before:z-10 before:absolute before:-right-2 before:top-1/2 before:w-max before:max-w-lg before:translate-x-full before:-translate-y-1/2 before:rounded-md before:px-2 before:py-1.5 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  return (
    <div
      className='before:border before:border-green-600 before:bg-gradient-to-br before:from-blue-50 before:to-purple-50 drop-shadow-xl relative before:z-10 before:absolute before:-left-2 before:top-1/2 before:w-max before:max-w-lg before:-translate-x-full before:-translate-y-1/2 before:rounded-md before:px-2 before:py-1.5 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
      tool-tip={title}
    >
      {children}
    </div>
  );
}
