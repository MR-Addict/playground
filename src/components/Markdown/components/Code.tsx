export default function Code(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  // normal code block
  if (props.className) {
    return <code {...props}>{props.children}</code>;
  }

  // inline code
  return (
    <code {...props} className='p-1 mx-1 text-gray-700 bg-gray-200 rounded-md text-sm'>
      {props.children}
    </code>
  );
}
