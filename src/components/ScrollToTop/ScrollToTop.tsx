"use client";

import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
  const [isVisiable, setIsVisiable] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) setIsVisiable(true);
      else setIsVisiable(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type='button'
      onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 md:bottom-10 right-5 md:right-10 duration-300 shadow-md bg-green-500 text-white rounded-full p-2 ${
        isVisiable ? "scale-100" : "scale-0"
      }`}
    >
      <IoIosArrowUp size={30} />
    </button>
  );
}
