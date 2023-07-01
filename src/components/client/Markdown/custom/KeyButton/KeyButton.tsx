export default function CusKeyButton({ title }: { title: string }) {
  return (
    <span className="bg-green-600 text-white font-semibold text-lg border-b-4 border-r-4 border-l-4 border-t-2 shadow-md border-green-700 py-1 px-2 rounded-md my-3">
      {title}
    </span>
  );
}
