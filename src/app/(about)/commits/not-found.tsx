import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-row items-center justify-center gap-1'>
      <h1 className='text-gray-700'>There's no more commits.</h1>
      <Link href='/commits' className='text-blue-600 md:hover:underline'>
        Go back!
      </Link>
    </div>
  );
}
