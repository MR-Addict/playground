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
        className='relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-lg before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-600 before:px-2 before:py-1.5 before:text-white before:hidden before:content-[attr(tool-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-600 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:hidden md:hover:before:block md:hover:after:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "bottom")
    return (
      <div
        className='relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-lg before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-600 before:px-2 before:py-1.5 before:text-white before:hidden before:content-[attr(tool-tip)] after:z-10 after:absolute after:left-1/2 after:-bottom-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-600 after:border-l-transparent after:border-t-transparent after:border-r-transparent after:hidden md:hover:before:block md:hover:after:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  else if (position === "right")
    return (
      <div
        className='relative before:z-10 before:absolute before:-right-3 before:top-1/2 before:w-max before:max-w-lg before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-600 before:px-3 before:py-2 before:text-white before:hidden before:content-[attr(tool-tip)] after:z-10 after:absolute after:-right-3 after:top-1/2 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-r-gray-600 after:border-l-transparent after:border-b-transparent after:border-t-transparent after:hidden md:hover:before:block md:hover:after:block'
        tool-tip={title}
      >
        {children}
      </div>
    );
  return (
    <div
      className='relative before:z-10 before:absolute before:-left-3 before:top-1/2 before:w-max before:max-w-lg before:-translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-600 before:px-3 before:py-2 before:text-white before:hidden before:content-[attr(tool-tip)] after:z-10 after:absolute after:-left-3 after:top-1/2 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-l-gray-600 after:border-r-transparent after:border-b-transparent after:border-t-transparent after:hidden md:hover:before:block md:hover:after:block'
      tool-tip={title}
    >
      {children}
    </div>
  );
}
