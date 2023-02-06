"use client";

import { ImInfo } from "react-icons/im";

import style from "./Capture.module.css";
import { ResultType, useCaptureContext } from "./CaptureContextProvider";

export default function Result() {
  const { result } = useCaptureContext();

  return (
    <section aria-label='website capture result' className='w-full mt-10 flex flex-col items-center gap-10'>
      {result.status === "fail" && (
        <h1 className={style.fail}>Woop! Something went wrong while capturing your website.</h1>
      )}
      {result.status === "processing" && <div className={style.loader}>Capturing</div>}
      {result.status === "success" && <Output result={result} />}
      <Attention />
    </section>
  );
}

function Output({ result }: { result: ResultType }) {
  return (
    <div className='w-full max-w-2xl flex flex-col gap-1'>
      <div className='flex flex-col gap-1'>
        <span>
          <strong>Capture time</strong>: {result.runtime}s
        </span>
        <span>
          <strong>Download image</strong>:{" "}
          <a href={result.base64} download={`website.${result.type}`} className='text-blue-600 hover:underline'>
            website.{result.type}
          </a>
        </span>
        <span>
          <strong>Captured website URL</strong>:{" "}
          <a href={result.url} target='_blank' className='text-blue-600 hover:underline'>
            {result.url}
          </a>
        </span>
      </div>
      <img src={result.base64} alt='capture website image' className='w-full rounded-md shadow-lg' />
    </div>
  );
}

function Attention() {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='font-bold text-xl flex flex-row items-center gap-1'>
        Attention
        <ImInfo size={18} />
      </h1>
      <ul className='list-disc ml-5'>
        <li>
          <strong>Website URL</strong>, make sure you put valid URL, and your website is accessible.
        </li>
        <li>
          <strong>Full page</strong> will capture full page of your site, make sure your site is not infinitely
          scrollable like <strong>youtube</strong> or <strong>tiktok</strong>.
        </li>
        <li>
          <strong>Delay</strong> means seconds before capture website after finished loading your website. Such as your
          website got a animation when loading.
        </li>
        <li>
          <strong>Timeout</strong> means seconds trying to access your website. Don't set it too long, otherwise you may
          wait for a long time.
        </li>
        <li>
          <strong>Disable animation</strong>, specially for disabling CSS animation, recommand to check it. If your
          website got animation, result could be bluring.
        </li>
        <li>
          <strong>Image type</strong>, make sure choose it before capturing. You cannot change it after capturing
          website.
        </li>
      </ul>
    </div>
  );
}
