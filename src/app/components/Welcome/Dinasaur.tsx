"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import dinosaur from "./dinosaur.png";

export default function Dinosaur() {
  const [angle, setAngle] = useState(0);
  const dinoImg = document.getElementById("dinosaurImg");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dinoImg) return;
      setAngle((Math.atan2(event.clientY - dinoImg.offsetTop, event.clientX - dinoImg.offsetLeft) * 180) / Math.PI);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div id='dinosaurImg' className='relative'>
      <Image src={dinosaur} alt='dinosaur' className='w-full max-w-xs' />
      <span
        style={{ transform: `rotate(${angle}deg)` }}
        className='w-[23px] h-[23px] absolute top-[20px] left-[102px] after:content-[""] after:absolute after:top-[8px] after:left-[15px] after:w-2 after:h-2 after:bg-[#4F4F5A] after:rounded-full rotate-45'
      ></span>
      <span
        style={{ transform: `rotate(${angle}deg)` }}
        className='w-[23px] h-[23px] absolute top-[20px] left-[146px] after:content-[""] after:absolute after:top-[8px] after:left-[15px] after:w-2 after:h-2 after:bg-[#4F4F5A] after:rounded-full rotate-45'
      ></span>
    </div>
  );
}
