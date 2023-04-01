import Link from "next/link";

export default function Anchor(
  props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  // heading anchor
  if (props.href?.startsWith("#")) {
    return (
      <a {...props} className='my-1'>
        {props.children}
      </a>
    );
  } else if (props.href?.startsWith("/")) {
    return (
      <Link href={props.href} className='text-lg text-blue-600 hover:underline'>
        {props.children}
      </Link>
    );
  }

  // normal anchor
  return (
    <a {...props} target='_blank' className='text-lg text-blue-600 hover:underline'>
      {props.children}
    </a>
  );
}
