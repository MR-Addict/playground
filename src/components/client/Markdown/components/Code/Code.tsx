export default function Code(props: React.ComponentProps<"code">) {
  // normal code block
  if (props.className) {
    return <code {...props}>{props.children}</code>;
  }

  // inline code
  return (
    <code {...props} className="px-1 text-gray-800 bg-slate-200 rounded-sm text-base">
      {props.children}
    </code>
  );
}
