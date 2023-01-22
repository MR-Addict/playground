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
        className='before:drop-shadow-xl relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-lg before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-white before:p-2 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "bottom")
    return (
      <div
        className='before:bg-white drop-shadow-xl relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-lg before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:px-2 before:py-1.5 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "right")
    return (
      <div
        className='before:bg-white drop-shadow-xl relative before:z-10 before:absolute before:-right-3 before:top-1/2 before:w-max before:max-w-lg before:translate-x-full before:-translate-y-1/2 before:rounded-md before:px-3 before:py-2 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  return (
    <div
      className='before:bg-white drop-shadow-xl relative before:z-10 before:absolute before:-left-3 before:top-1/2 before:w-max before:max-w-lg before:-translate-x-full before:-translate-y-1/2 before:rounded-md before:px-3 before:py-2 before:text-gray-700 before:hidden before:content-[attr(tool-tip)] md:hover:before:block'
      tool-tip={title}
    >
      {children}
    </div>
  );
}
