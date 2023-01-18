import style from "./Welcome.module.css";

export default function Welcome() {
  return (
    <div className='frame w-full flex flex-col items-center gap-10 md:gap-20 py-20'>
      <h1 className='font-bold text-3xl md:text-5xl text-center text-gray-700 italic'>Welcome to my Next.js</h1>
      <h1 className={style.animatedtext}>Playground</h1>
      <h1 className='max-w-2xl md:indent-8 text-xl md:text-2xl text-gray-500 text-center'>
        This is a website I build all kinds of interesting web apps based on
        <a href='https://beta.nextjs.org/docs/' target='_blank' className='text-blue-500 mx-1 hover:underline'>
          Next.js 13
        </a>
        in one place which I think is fun and may also be useful in my daily life. I hope I can keep my eenthusiasm for
        a very long time, so I put a recoder under website footer. I hope you can have the same thought like me as well
        after have a visit.
      </h1>
    </div>
  );
}
