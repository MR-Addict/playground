import { ImArrowLeft2 } from "react-icons/im";

import { ClientLink } from "@/components/client";

export default function Back() {
  return (
    <ClientLink
      href="/tools"
      aria-label="go back to tools"
      className="hidden md:block h-fit duration-300 text-blue-600"
    >
      <ImArrowLeft2 size={20} />
    </ClientLink>
  );
}
