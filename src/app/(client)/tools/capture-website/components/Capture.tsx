"use client";

import classNames from "classnames";
import { useState } from "react";
import { ImInfo } from "react-icons/im";

import style from "./Capture.module.css";
import { Tooltip } from "@/components/server";
import { useCaptureContext } from "./CaptureContextProvider";

export default function Capture() {
  const { result, setResult } = useCaptureContext();

  const defaultFormData = {
    url: "",
    type: "webp",
    width: 1920,
    height: 1080,
    delay: 0,
    timeout: 30,
    fullPage: false,
    disableAnimations: false,
  };

  const [formData, setFormData] = useState(defaultFormData);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ ...result, status: "processing" });
    fetch("https://api.mraddict.one/screenshot", {
      method: "POST",
      //@ts-expect-error
      body: new URLSearchParams(formData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          setResult({ status: "success", ...result.data });
        } else {
          console.error(result.message);
          setResult({ base64: "", type: "webp", url: "", runtime: 0, status: "fail" });
        }
      })
      .catch((error) => {
        console.error(error);
        setResult({ base64: "", type: "webp", url: "", runtime: 0, status: "fail" });
      });
  }

  return (
    <form aria-label='capture website form' onSubmit={handleSubmit} className={classNames(style.form, "background")}>
      <div className={style.element}>
        <label htmlFor='url'>
          <p>Website URL</p>
          <Tooltip title='Input valid URL'>
            <span>
              <ImInfo />
            </span>
          </Tooltip>
        </label>
        <input
          required
          id='url'
          name='url'
          type='url'
          value={formData.url}
          className='background'
          placeholder='Website URL'
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      </div>

      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className={style.element}>
          <label htmlFor='width'>
            <p>Width</p>
            <Tooltip title='Range from 320~3840'>
              <span>
                <ImInfo />
              </span>
            </Tooltip>
          </label>
          <input
            required
            min={320}
            max={3840}
            id='width'
            name='width'
            type='number'
            className='background'
            value={formData.width}
            placeholder='Width'
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <div className={style.element}>
          <label htmlFor='height'>
            <p>Height</p>
            <Tooltip title='Range from 240~2160'>
              <span>
                <ImInfo />
              </span>
            </Tooltip>
          </label>
          <input
            required
            min={240}
            max={2160}
            id='height'
            name='height'
            type='number'
            className='background'
            value={formData.height}
            placeholder='height'
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <div className={style.element}>
          <label htmlFor='delay'>
            <p>Delay</p>
            <Tooltip title='Delay before capture, range from 0~10'>
              <span>
                <ImInfo />
              </span>
            </Tooltip>
          </label>
          <input
            required
            min={0}
            max={10}
            id='delay'
            name='delay'
            type='number'
            className='background'
            value={formData.delay}
            placeholder='delay'
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <div className={style.element}>
          <label htmlFor='timeout'>
            <p>Timeout</p>
            <Tooltip title='Timeout for loading page, range from 10~60'>
              <span>
                <ImInfo />
              </span>
            </Tooltip>
          </label>
          <input
            required
            min={10}
            max={60}
            id='timeout'
            name='timeout'
            type='number'
            className='background'
            value={formData.timeout}
            placeholder='timeout'
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row items-center gap-5 mt-2'>
        <div className='flex flex-row gap-5'>
          <div className={style.select}>
            <label htmlFor='fullPage'>
              <p>Full Page</p>
              <Tooltip title='Capture full screen page'>
                <span>
                  <ImInfo />
                </span>
              </Tooltip>
            </label>
            <input
              type='checkbox'
              id='fullPage'
              name='fullPage'
              checked={formData.fullPage}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
            />
          </div>

          <div className={style.select}>
            <label htmlFor='disableAnimations'>
              <p>Disable Animation</p>
              <Tooltip title='Disable Any CSS Animation'>
                <span>
                  <ImInfo />
                </span>
              </Tooltip>
            </label>
            <input
              type='checkbox'
              id='disableAnimations'
              name='disableAnimations'
              checked={formData.disableAnimations}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
            />
          </div>
        </div>

        <div className={style.select}>
          <label htmlFor='type'>
            <p>Image Type</p>
            <Tooltip title='Only support png, jpeg and webp'>
              <span>
                <ImInfo />
              </span>
            </Tooltip>
          </label>
          <select
            required
            id='type'
            name='type'
            className='background px-2 pb-1 rounded-[0.3rem] outline-none border border-black'
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          >
            <option value='png'>png</option>
            <option value='jpeg'>jpeg</option>
            <option value='webp'>webp</option>
          </select>
        </div>
      </div>

      <div className='w-full flex flex-row gap-3'>
        <button type='submit' className={style.button} disabled={!formData.url || result.status === "processing"}>
          Capture
        </button>
        <button
          type='button'
          className={style.button}
          disabled={result.status === "processing"}
          onClick={() => {
            setFormData(defaultFormData);
            setResult({ base64: "", type: "webp", url: "", runtime: 0, status: "idle" });
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
