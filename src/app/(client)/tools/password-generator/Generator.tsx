"use client";

import classNames from "classnames";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { ImInfo, ImArrowDown } from "react-icons/im";

import characters from "./characters";
import style from "./Generator.module.css";
import generatePasswords from "./generatePasswords";

import { Tooltip } from "@/components";
import { usePopupContext } from "@/contexts";
import { copyToClipboard } from "@/lib/utils";

export default function Generator() {
  const { popup } = usePopupContext();

  const [input, setInput] = useState({ length: 20, lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [output, setOutput] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutput(generatePasswords(input));
  }

  function handleCopy() {
    copyToClipboard(output);
    popup({ status: true, message: "Password copied" });
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (Object.values(input).filter((item) => item === true).length > 1 || Boolean(event.target.checked))
      setInput({ ...input, [event.target.name]: Boolean(event.target.checked) });
  }

  return (
    <section aria-label='password generator page' className='w-full max-w-md flex flex-col items-center gap-5 md:gap-7'>
      <header aria-label='title' className='flex flex-row items-center gap-2'>
        <h1 className='text-3xl text-center text-gray-700 font-bold'>Password Generator</h1>
        <Tooltip title="I won't collect your passwords. You can use it safely.">
          <div className='text-gray-500 cursor-pointer'>
            <ImInfo size={15} />
          </div>
        </Tooltip>
      </header>
      <form
        onSubmit={handleSubmit}
        aria-label='password generator part'
        className='w-full background drop-shadow-lg border-t-4 border-blue-600 rounded-md p-5 flex flex-col items-center gap-5'
      >
        <div className='w-full flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-gray-700'>Requirements</h1>

            <label htmlFor='symbols' className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                id='symbols'
                name='symbols'
                checked={input.symbols}
                onChange={handleCheck}
              />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Symbols</h1>
              <Tooltip title={`Symbols are ${characters.symbols}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>

            <label htmlFor='number' className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                id='number'
                name='numbers'
                checked={input.numbers}
                onChange={handleCheck}
              />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Numbers</h1>
              <Tooltip title={`Numbers are ${characters.numbers}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>

            <label htmlFor='lowercase' className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                id='lowercase'
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

            <label htmlFor='uppercase' className='relative flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='peer'
                id='uppercase'
                name='uppercase'
                checked={input.uppercase}
                onChange={handleCheck}
              />
              <span className='absolute top-0 left-0 duration-100 w-6 h-6 bg-gray-300 rounded-sm peer-hover:cursor-pointer peer-checked:bg-blue-600 after:absolute after:hidden after:peer-checked:block after:content-[""] after:left-2 after:top-1 after:w-2 after:h-4 after:border-r-4 after:border-b-4 after:border-white after:rotate-[35deg]'></span>
              <h1>Uppercase</h1>
              <Tooltip title={`Uppercase are ${characters.uppercase}`}>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='length' className='flex flex-row gap-2 items-center'>
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
              id='length'
              name='length'
              value={input.length}
              placeholder='Password length'
              onChange={(e) => setInput({ ...input, [e.target.name]: Number(e.target.value) })}
              className={classNames(style.input, "background")}
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
            placeholder='Generated passowrd will be here'
            className='w-full over text-center p-2 rounded-md background outline-none border border-black'
          />
          <div className='w-full flex flex-row items-center justify-center gap-1'>
            <button type='submit' aria-label='regenerate password' className='text-gray-700'>
              <BiRefresh size={27} />
            </button>
            <button
              type='button'
              onClick={handleCopy}
              disabled={!output}
              aria-label='copy password'
              className='disabled:cursor-not-allowed text-gray-700'
            >
              <MdContentCopy size={20} />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
