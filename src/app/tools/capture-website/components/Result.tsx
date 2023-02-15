"use client";

import { ImInfo } from "react-icons/im";

import style from "./Capture.module.css";
import { SpinLoader } from "@/components";
import { ResultType, useCaptureContext } from "./CaptureContextProvider";

export default function Result() {
  const { result } = useCaptureContext();

  return (
    <section aria-label='website capture result' className='w-full mt-10 flex flex-col items-center gap-10'>
      {result.status === "fail" && (
        <h1 className={style.fail}>Woop! Something went wrong while capturing your website.</h1>
      )}
      {result.status === "processing" && (
        <div className='flex flex-row items-center gap-2'>
          <SpinLoader size='1.4rem' />
          <p className='text-2xl font-semibold text-gray-700'>Capturing...</p>
        </div>
      )}
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
          <strong>Capture time</strong>: {result.runtime}
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
          <strong>Website URL</strong>, make sure you put a valid URL, and that your website is accessible.
        </li>
        <li>
          <strong>Full page</strong> will capture the full page of your site, make sure your site is not infinitely
          scrollable like <strong>youtube</strong> or <strong>tiktok</strong>.
        </li>
        <li>
          <strong>Delay</strong> means seconds before capturing after finishing loading your website. For example, your
          website got an animation when loading.
        </li>
        <li>
          <strong>Timeout</strong> means seconds trying to access your website. Don't set it too big, otherwise, you may
          wait for a long time.
        </li>
        <li>
          <strong>Disable animation</strong>, especially for disabling CSS animation, recommend checking it. If your
          website got animation, the result could be blurring.
        </li>
        <li>
          <strong>Image type</strong>, make sure to choose it before capturing. Webp is the smallest size and also
          faster, and then jpeg and png following.
        </li>
      </ul>
    </div>
  );
}
