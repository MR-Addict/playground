import { ClientLink } from "@/components/client";

export default function Anchor(props: React.ComponentProps<"a">) {
  // heading anchor
  if (props.href?.startsWith("#")) {
    return (
      <a {...props} className="my-1 break-words">
        {props.children}
      </a>
    );
  } else if (props.href?.startsWith("/")) {
    return (
      <ClientLink href={props.href} className="text-lg text-blue-600 hover:underline">
        {props.children}
      </ClientLink>
    );
  }

  // normal anchor
  return (
    <a {...props} target="_blank" className="text-lg text-blue-600 hover:underline break-words">
      {props.children}
    </a>
  );
}
