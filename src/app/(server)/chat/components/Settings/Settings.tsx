import classNames from "classnames";
import { AiOutlineClear } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import style from "./Settings.module.css";
import { useChatContext } from "../ChatWindow/ChatProvider";

export default function Settings() {
  const { regenerateResponse, options, setOptions, resetMessages, chatgptStatus } = useChatContext();

  return (
    <div className='w-full h-full flex flex-col justify-between text-white gap-4 bg-slate-700 rounded-b-md md:rounded-b-none md:rounded-l-md px-3 py-4'>
      <div className='flex flex-col gap-0.5'>
        <h1>Settings</h1>

        <div className='p-2 border border-gray-500 rounded-md flex flex-col gap-2'>
          <div className={style.inputelement}>
            <label htmlFor='model'>Model</label>
            <select
              required
              id='model'
              name='model'
              value={options.model}
              onChange={(e) => setOptions({ ...options, [e.target.name]: e.target.value })}
              className={style.input}
            >
              <option value='gpt-3.5-turbo'>gpt-3.5-turbo</option>
            </select>
          </div>

          <div className={style.inputelement}>
            <label htmlFor='temperature'>Temperature</label>
            <input
              type='number'
              min={0}
              max={1}
              value={options.temperature}
              id='temperature'
              name='temperature'
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
              className={style.input}
              required
            />
          </div>

          <div className={style.inputelement}>
            <label htmlFor='top_p'>Top p</label>
            <input
              type='number'
              min={0}
              max={1}
              id='top_p'
              name='top_p'
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
              value={options.top_p}
              className={style.input}
              required
            />
          </div>

          <div className={style.inputelement}>
            <label htmlFor='max_tokens'>Max Tokens</label>
            <input
              type='number'
              min={1}
              max={2048}
              value={options.max_tokens}
              onChange={(e) => setOptions({ ...options, [e.target.name]: Number(e.target.value) })}
              id='max_tokens'
              name='max_tokens'
              className={style.input}
              required
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-0.5'>
        <h1>Operations</h1>

        <div className='flex flex-col gap-3'>
          <button
            aria-label='regenerate button'
            type='button'
            onClick={regenerateResponse}
            disabled={chatgptStatus === "thinking"}
            className={classNames(style.btn, "border border-gray-500")}
          >
            <IoChatbubbleEllipsesOutline size={18} />
            <span>Regnerate</span>
          </button>

          <button
            onClick={resetMessages}
            disabled={chatgptStatus === "thinking"}
            className={classNames(style.btn, "border border-gray-500")}
          >
            <AiOutlineClear size={20} />
            <span>Clear prompts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
