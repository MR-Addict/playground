"use client";

import { hash } from "bcryptjs";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { ImInfo, ImArrowDown } from "react-icons/im";

import { Tooltip, usePopupContext } from "@/components";

export default function BcryptForm() {
  const { popup } = usePopupContext();
  const [hashData, setHashData] = useState({ password: "", saltRound: 10, result: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await hash(hashData.password, hashData.saltRound);
    setHashData({ ...hashData, result });
  }

  function handleCopy() {
    navigator.clipboard.writeText(hashData.result);
    popup({ status: true, message: "Copy success!" });
  }

  return (
    <div className='w-full max-w-xl flex flex-col items-center gap-5 md:gap-10'>
      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-3xl text-center text-gray-700 font-bold'>Bcrypt your password</h1>
        <Tooltip title="I won't collect your passwords. You can use it safely.">
          <div className='text-gray-500 cursor-pointer'>
            <ImInfo size={15} />
          </div>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col justify-between items-center gap-7'>
        <div className='w-full flex flex-col gap-5 rounded-md p-5 border-t-4 border-purple-600 bg-white drop-shadow-lg'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='password' className='flex flex-row gap-2 items-center'>
              <span>Password</span>
              <Tooltip title='Password needed to hashed'>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>
            <input
              required
              type='text'
              name='password'
              maxLength={500}
              placeholder='passowrd'
              value={hashData.password}
              onChange={(e) => setHashData({ ...hashData, [e.target.name]: e.target.value })}
              className='flex-1 p-3 outline-none bg-gray-100 rounded-md'
            />
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='saltRound' className='flex flex-row gap-2 items-center'>
              <span>Salt round</span>
              <Tooltip title='Allow 8-16 rounds, recommand 10 rounds'>
                <div className='text-gray-500 cursor-pointer'>
                  <ImInfo size={15} />
                </div>
              </Tooltip>
            </label>
            <input
              required
              min={8}
              max={16}
              type='number'
              name='saltRound'
              value={hashData.saltRound}
              placeholder='Salt round'
              onChange={(e) => setHashData({ ...hashData, [e.target.name]: Number(e.target.value) })}
              className='w-full p-3 outline-none bg-gray-100 rounded-md'
            />
          </div>
        </div>

        <div className='text-purple-600 drop-shadow-xl'>
          <ImArrowDown size={30} />
        </div>

        <div className='flex-1 w-full flex flex-col items-center justify-center gap-3 border-t-4 border-t-purple-600 bg-white drop-shadow-lg p-5 rounded-md'>
          <div className='w-full flex flex-row items-center justify-center gap-1'>
            <Tooltip title='Hash or Rehash'>
              <button
                type='submit'
                disabled={hashData.password === ""}
                className='disabled:cursor-not-allowed text-gray-700 duration-200 active:rotate-180'
              >
                <BiRefresh size={27} />
              </button>
            </Tooltip>
            <Tooltip title='Copy'>
              <button
                type='button'
                onClick={handleCopy}
                disabled={hashData.result === ""}
                className='disabled:cursor-not-allowed text-gray-700'
              >
                <MdContentCopy size={20} />
              </button>
            </Tooltip>
          </div>
          <input
            readOnly={true}
            value={hashData.result}
            className='w-full text-center p-1 rounded-md bg-gray-100 outline-none'
          />
        </div>
      </form>
    </div>
  );
}
