"use client";

import { hash } from "bcryptjs";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { ImInfo, ImArrowDown } from "react-icons/im";

import style from "./BcryptForm.module.css";
import { Tooltip } from "@/components";
import { copyToClipboard } from "@/lib/utils";
import { usePopupContext } from "@/contexts";

export default function BcryptForm() {
  const { popup } = usePopupContext();

  const [output, setOutput] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [input, setInput] = useState({ password: "", saltRound: 10 });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsHashing(true);
    setOutput(await hash(input.password, input.saltRound));
    setIsHashing(false);
  }

  function handleCopy() {
    copyToClipboard(output);
    popup({ status: true, message: "Copy succeeded" });
  }

  return (
    <section aria-label='bcrypt page' className='w-full max-w-md flex flex-col items-center gap-5 md:gap-7'>
      <header aria-label='title' className='flex flex-row items-center gap-2'>
        <h1 className='text-3xl text-center text-gray-700 font-bold'>Bcrypt Password</h1>
        <Tooltip title="I won't collect your passwords. You can use it safely.">
          <div className='text-gray-500 cursor-pointer'>
            <ImInfo size={15} />
          </div>
        </Tooltip>
      </header>
      <form
        aria-label='bcrypt form part'
        onSubmit={handleSubmit}
        className='w-full background flex flex-col justify-between items-center rounded-md border-t-4 border-purple-600 drop-shadow-lg p-5 gap-5'
      >
        <div className='w-full flex flex-col gap-5'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='bcryptPassword' className='flex flex-row gap-2 items-center'>
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
              id='bcryptPassword'
              name='password'
              maxLength={100}
              placeholder='passowrd'
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className={[style.input, "background"].join(" ")}
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
              min={8}
              max={16}
              required
              type='number'
              id='saltRound'
              name='saltRound'
              value={input.saltRound}
              placeholder='Salt round'
              onChange={(e) => setInput({ ...input, [e.target.name]: Number(e.target.value) })}
              className={[style.input, "background"].join(" ")}
            />
          </div>
        </div>

        <div className='text-purple-600 drop-shadow-xl'>
          <ImArrowDown size={30} />
        </div>

        <div className='flex-1 w-full flex flex-col items-center justify-center gap-3 '>
          <input
            readOnly={true}
            value={output}
            placeholder='Generated hash string will be here'
            className='w-full over text-center p-2 rounded-md background outline-none border border-black'
          />
          <div className='w-full flex flex-row items-center justify-center gap-1'>
            <button
              type='submit'
              aria-label='regenerate hashed password'
              disabled={input.password === "" || isHashing}
              className='text-gray-700 disabled:cursor-not-allowed'
            >
              <BiRefresh size={27} />
            </button>
            <button
              type='button'
              aria-label='copy hashed password'
              onClick={handleCopy}
              disabled={output === ""}
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
