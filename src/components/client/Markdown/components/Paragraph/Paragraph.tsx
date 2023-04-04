export default function Paragraph(props: React.ComponentProps<"p">) {
  return (
    <p {...props} className='my-4 text-lg text-gray-700'>
      {props.children}
    </p>
  );
}
