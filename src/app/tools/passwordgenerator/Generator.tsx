"use client";

import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { ImInfo, ImArrowDown } from "react-icons/im";

import { Tooltip, usePopupContext } from "@/components";
import generatePasswords from "./generatePasswords";
import characters from "./characters";

export default function Generator() {
  const { popup } = usePopupContext();

  const [input, setInput] = useState({ length: 20, lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [output, setOutput] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutput(generatePasswords(input));
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    popup({ status: true, message: "Copy success!" });
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (Object.values(input).filter((item) => item === true).length > 1 || Boolean(event.target.checked))
      setInput({ ...input, [event.target.name]: Boolean(event.target.checked) });
  }

  return (
    <div className='w-full max-w-md flex flex-col items-center gap-5 md:gap-7'>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-3xl text-center text-gray-700 font-bold'>Password Generator</h1>
        <Tooltip title="I won't collect your passwords. You can use it safely.">
          <div className='text-gray-500 cursor-pointer'>
            <ImInfo size={15} />
          </div>
        </Tooltip>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full bg-white drop-shadow-lg border-t-4 border-blue-600 rounded-md p-5 flex flex-col items-center gap-5'
      >
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-gray-700'>Requirements</h1>

            <label className='relative flex flex-row items-center gap-4'>
              <input type='checkbox' className='peer' name='symbols' checked={input.symbols} onChange={handleCheck} />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Symbols</h1>
              <Tooltip title={`Lowercase are ${characters.symbols}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>

            <label className='relative flex flex-row items-center gap-4'>
              <input type='checkbox' className='peer' name='numbers' checked={input.numbers} onChange={handleCheck} />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Numbers</h1>
              <Tooltip title={`Lowercase are ${characters.numbers}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>

            <label className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                name='lowercase'
                checked={input.lowercase}
                onChange={handleCheck}
              />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Lowercase</h1>
              <Tooltip title={`Lowercase are ${characters.lowercase}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>

            <label className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                name='uppercase'
                checked={input.uppercase}
                onChange={handleCheck}
              />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Uppercase</h1>
              <Tooltip title={`Lowercase are ${characters.uppercase}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='saltRound' className='flex flex-row gap-2 items-center'>
              <span>Password length</span>
              <Tooltip title='Your password should be 1-50 characters long.'>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>
            <input
              min={1}
              max={50}
              required
              type='number'
              name='length'
              value={input.length}
              placeholder='Password length'
              onChange={(e) => setInput({ ...input, [e.target.name]: Number(e.target.value) })}
              className='w-full p-3 outline-none bg-gray-100 rounded-md'
            />
          </div>
        </div>

        <div className='text-blue-600 drop-shadow-xl'>
          <ImArrowDown size={30} />
        </div>

        <div className='flex-1 w-full flex flex-col items-center justify-center gap-3'>
          <input
            readOnly={true}
            value={output}
            placeholder='Generated passowrd string will be here.'
            className='w-full over text-center p-1 rounded-md bg-gray-100 outline-none'
          />
          <div className='w-full flex flex-row items-center justify-center gap-1'>
            <button type='submit' className='text-gray-700'>
              <BiRefresh size={27} />
            </button>
            <button
              type='button'
              onClick={handleCopy}
              disabled={output === ""}
              className='disabled:cursor-not-allowed text-gray-700'
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
