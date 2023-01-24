export default function Anchor(
  props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  // Title a tag
  if (props.href?.startsWith("#")) {
    return (
      <a {...props} className='my-1'>
        {props.children}
      </a>
    );
  }

  // normal anchar
  return (
    <a {...props} className='m-1 text-base text-blue-600 hover:underline'>
      {props.children}
    </a>
  );
}
