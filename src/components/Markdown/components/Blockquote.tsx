export default function Blockquote(
  props: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
) {
  return (
    <blockquote
      {...props}
      className='my-3 text-base text-gray-700 border-l-4 border-gray-300 bg-gray-200 pl-5 py-[1px]'
    >
      {props.children}
    </blockquote>
  );
}
