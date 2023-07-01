export default function Platform() {
  return (
    <div className="flex flex-row">
      <span>Powered by</span>
      <a href="https://vercel.com/" target="_blank" className="underline mx-1">
        vercel
      </a>
      <span>and</span>
      <a href="https://www.mongodb.com/atlas/database" target="_blank" className="underline ml-1">
        mongodb
      </a>
      <span>.</span>
    </div>
  );
}
