import { ClientLink } from "@/components/client";

export default function NotFound() {
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <h1 className="text-gray-700">There's no more commits.</h1>
      <ClientLink href="/commits" className="text-blue-600 md:hover:underline">
        Go back!
      </ClientLink>
    </div>
  );
}
