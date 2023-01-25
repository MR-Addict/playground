export default function Paragraph(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) {
  return (
    <p {...props} className='my-3 text-base text-gray-700'>
      {props.children}
    </p>
  );
}
