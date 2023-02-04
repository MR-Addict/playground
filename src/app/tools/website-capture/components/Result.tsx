"use client";

import { useCaptureContext } from "./CaptureContextProvider";

export default function Result() {
  const { result } = useCaptureContext();

  return (
    <section aria-label='website capture result'>
      {result.status === "fail" && <p>Failed</p>}
      {result.status === "idle" && <p>Idle</p>}
      {result.status === "processing" && <p>Capturing</p>}
      {result.status === "success" && (
        <img
          src={`data:image/${result.type};base64,${result.base64}`}
          alt='capture website image'
          className='w-full rounded-md'
        />
      )}
    </section>
  );
}
