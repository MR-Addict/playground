export default function Paragraph(
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) {
  return <img {...props} className='w-full h-full rounded-md my-4 shadow-lg object-cover object-center' />;
}
