export default function Blockquote(props: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      className="my-4 text-gray-700 border-l-4 border-l-gray-500 bg-slate-200 pl-5 py-0.5 rounded-r-md"
    >
      {props.children}
    </blockquote>
  );
}
