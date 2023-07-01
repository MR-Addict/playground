import { ClientLink } from "@/components/client";

export default function NotFound() {
  return (
    <main aria-label="404 notfound page" className="flex flex-row items-center justify-center gap-1">
      <h1 className="text-gray-700">Post not found.</h1>
      <ClientLink href="/blog" className="text-blue-600 md:hover:underline">
        Go back!
      </ClientLink>
    </main>
  );
}
