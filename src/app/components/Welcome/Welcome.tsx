import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { BsTelegram } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

import style from "./Welcome.module.css";
import welcome from "./welcome.png";
import Dinosaur from "./Dinasaur";

export default function Welcome() {
  return (
    <div className='py-16 md:py-24 px-5 md:px-48 w-full flex flex-row'>
      <div className='flex flex-col justify-between gap-16'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col md:flex-row gap-3'>
            <h1 className='font-bold text-3xl md:text-4xl text-gray-600 whitespace-nowrap'>WELCOME TO MY</h1>
            <h1 className={style.animatedtext}>PLAYGROUND</h1>
          </div>
          <div className='max-w-lg text-xl text-gray-500'>
            This is a website I build all kinds of interesting web apps based on
            <a href='https://beta.nextjs.org/docs/' target='_blank' className='text-blue-500 mx-1 hover:underline'>
              Next.js 13
            </a>
            in one place. Hope you will have the same thought like me as well after have a visit.
          </div>
          <div className='flex flex-row items-center gap-3'>
            <a href='mailto:mr-addict@qq.com' target='_blank'>
              <MdEmail size={30} className='text-gray-700 drop-shadow-lg m-1 hover:drop-shadow-2xl' />
            </a>
            <a href='http://t.me/owencael' target='_blank'>
              <BsTelegram size={27} className='text-gray-700 drop-shadow-lg m-1 hover:drop-shadow-2xl' />
            </a>
            <a href='http://github.com/mr-addict' target='_blank'>
              <AiFillGithub size={30} className='text-gray-700 drop-shadow-lg m-1 hover:drop-shadow-2xl' />
            </a>
          </div>
        </div>
        <Dinosaur />
      </div>
      <div className='flex flex-col justify-end'>
        <Image
          src={welcome}
          alt='welcome'
          placeholder='empty'
          priority={true}
          className='hidden md:block w-full max-w-2xl object-cover object-center'
        />
      </div>
    </div>
  );
}
