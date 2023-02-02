import Link from "next/link";

export default function Page() {
  return (
    <div className='flex flex-row items-center justify-center gap-1'>
      <h1 className='text-gray-700'>Post not found.</h1>
      <Link href='/blog' className='text-blue-600 md:hover:underline'>
        Go back!
      </Link>
    </div>
  );
}
