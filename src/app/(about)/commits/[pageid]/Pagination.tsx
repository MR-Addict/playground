import Link from "next/link";

export default function Pagination({ count, currentPage }: { count: number; currentPage: number }) {
  return (
    <section aria-label='pagination buttons' className='flex flex-row justify-center gap-2'>
      {Array.from(Array(count)).map((item, index) => (
        <Link
          key={index}
          href={`/commits/${index + 1}`}
          className={currentPage === index + 1 ? "text-green-600" : "text-gray-700"}
        >
          {index + 1}
        </Link>
      ))}
    </section>
  );
}
