"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import dinosaur from "./dinosaur.png";

export default function Dinosaur() {
  const [angle, setAngle] = useState(0);
  const dinoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!dinoRef.current) return;
      const react = dinoRef.current.getBoundingClientRect();
      setAngle((Math.atan2(event.clientY - react.top, event.clientX - react.left) * 180) / Math.PI);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-fit hidden md:block">
      <span ref={dinoRef} className="absolute top-7 left-32"></span>
      <Image priority={true} placeholder="blur" src={dinosaur} alt="dinosaur" className="w-full max-w-xs" />
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
