import { useEffect, useRef, useState } from "react";

import { copyToClipboard } from "@/lib/utils";

export default function Pre(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleClick() {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  }

  return (
    <div className='relative group'>
      <pre {...props} ref={preRef}>
        <button
          type='button'
          disabled={copied}
          onClick={handleClick}
          aria-label='Copy to Clipboard'
          className='absolute space-x-2 top-0 right-0 m-2 hidden transition bg-transparent border rounded-md p-2 focus:outline-none group-hover:flex disabled:flex fade-in'
        >
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 pointer-events-none'
          >
            {copied ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
              />
            )}
          </svg>
        </button>
        {props.children}
      </pre>
    </div>
  );
}
