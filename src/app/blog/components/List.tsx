export default function List(props: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
  // input
  if (props.className === "task-list-item") {
    return (
      <li {...props} className='my-1 text-base text-gray-700'>
        {props.children}
      </li>
    );
  }

  // normal list
  return (
    <li {...props} className='my-3 text-base text-gray-700 list-disc ml-5'>
      {props.children}
    </li>
  );
}
