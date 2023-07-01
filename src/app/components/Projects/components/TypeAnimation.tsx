import style from "./TypeAnimation.module.css";

export default function TypeAnimation() {
  return (
    <div className="bg-gray-700 rounded-xl flex flex-col w-full max-w-lg h-40">
      <div className="w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-500">
        <div className="flex flex-row gap-1 w-fit">
          <span className="bg-red-600 rounded-full w-3 h-3"></span>
          <span className="bg-yellow-600 rounded-full w-3 h-3"></span>
          <span className="bg-green-600 rounded-full w-3 h-3"></span>
        </div>
        <h1 className="text-gray-300">Bash</h1>
        <div></div>
      </div>
      <div className="w-full flex flex-col gap-1 py-3 px-5">
        <h1 className="text-gray-100">cael@nextjs:~$ npm run build</h1>
        <div className="flex flex-row items-center gap-1 w-fit">
          <h1 className="text-gray-100">cael@nextjs:~$</h1>
          <h1 className={style.blinkcursor}>npm run start</h1>
        </div>
      </div>
    </div>
  );
}
