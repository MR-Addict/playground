---
title: "Add Progressbar to Your Next.js 13 App"
date: "2023-04-3 13:15"
tags: ["next.js-13", "progressbar", "nprogress"]
intro: "Solve the problem that unable use nextjs-progressbar"
---

## 1. What's the problem

Due to next.js **SSR** is not that fast, and when you click a link that needs SSR, the page could be still for a long time. So I managed to make it after a ton of research.

The solution I will use is inspired by this github repository, and there is also a dem you can have a try:

- [https://github.com/joulev/nextjs13-appdir-router-events](https://github.com/joulev/nextjs13-appdir-router-events)
- [https://nextjs13-router-events.vercel.app](https://nextjs13-router-events.vercel.app)

Actually, there is an npm package called [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar) that you can use easily used in your **next.js 12** project. But if you're like me using next.js 13, this package won't work.

The reason is that the original package is using **router.events.on** to listen to router events.

```tsx:useRouter.tsx
const router = useRouter();
useEffect(() => {
  router.events.on("routeChangeStart", routeChangeStart);
  router.events.on("routeChangeComplete", routeChangeEnd);
  router.events.on("routeChangeError", routeChangeError);
  return () => {
    router.events.off("routeChangeStart", routeChangeStart);
    router.events.off("routeChangeComplete", routeChangeEnd);
    router.events.off("routeChangeError", routeChangeError);
  };
}, []);
```

However, if you use router.events.on in next.js 13, it will throw `NextRouter was not mounted` error. You can find more information about this problem on this github discussion:

- [https://github.com/vercel/next.js/discussions/46478](https://github.com/vercel/next.js/discussions/46478)

I don't know whether next.js team will solve this issue, but I need this feature to improve my website UX in some pages:

- [commits page](/commits)

## 2. Principle

The basis of this solution is that first, we click a **Link** Component, then we **trigger** a signal that incidates that page loading should be started. And we add an event listener that **listens** whether a router has changed, if changed, then the page loading should be finished.

It seems not right, but it's working and working well you can trust me on this.

## 3. Trigger Start Signal

But how to trigger a start signal? There is a problem with this, the click event should be on the client side, so we need to create a custom **ClientLink** that extends the origin Link and is used on the client side.

This is my custom ClientLink:

```tsx:ClientLink.tsx
"use client";

import Link from "next/link";

import { useProgressbarContext } from "@/contexts";

type Props = {
  disabled?: boolean;
} & React.ComponentProps<typeof Link>;

export default function ClientLink({ href, disabled, children, onClick, ...rest }: Props) {
  const { startProgress } = useProgressbarContext();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (disabled) return;
    const { pathname, search, hash } = window.location;
    if (href !== pathname + search + hash) startProgress();
    if (onClick) onClick(event);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
```

You can use this **ClientLink** as normally as the original **Link** component, and you allow to add more attributes to it like `disabled`, isn't that cool?

You may find that I import a handler **startProgress** from **useProgressbarContext**, that's because I need to tell that progress context that progress should be started. Don't worry, you can find this context in the next part.

And you can replace all your Link with ClientLink like this:

```tsx:Navbar.tsx
import { usePathname } from "next/navigation";

import navbarData from "./config";
import { ClientLink } from "@/components/client";

export default function Navbar() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className='hidden lg:flex flex-row gap-4'>
      {navbarData
        .map((item, index) => (
          <li key={index}>
            <ClientLink
              href={item.link}
              className={`${rootPath === item.link ? "text-green-600" : "text-gray-700 hover:text-green-600"} relative`}
            >
              {item.title}
            </ClientLink>
          </li>
        ))}
    </ul>
  );
}
```

## 4. Listen Finish Signal

You can use useEffect to listen to router changes like pathname searchParams from next.js.

But to do this, you also need to make a custom client-side component. You can do something like this:

```tsx:ListenRouter.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const pathname = usePathname();
const searchParams = useSearchParams();

useEffect(() => console.log('Router changed!'), [pathname, searchParams]);
```

For a better use case, you want to make it a context component that you can access from anywhere.

```tsx:Progressbar.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface ProgressbarContextProps {
  startProgress: () => void;
}

const ProgressbarContext = createContext<ProgressbarContextProps>({
  startProgress: () => {},
});

interface ProgressbarContextProviderProps {
  children: React.ReactNode;
  height?: number;
  color?: string;
}

export const ProgressbarContextProvider = ({
  children,
  height = 2,
  color = "#16a34a",
}: ProgressbarContextProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  function startProgress() {
    setProgress(20);
    setIsLoading(true);
    setIsTimerRunning(true);
  }

  function finishProgress() {
    setProgress(100);
    setIsTimerRunning(false);
  }

  function resetProgress() {
    setProgress(20);
    setIsLoading(false);
    setIsTimerRunning(false);
  }

  useEffect(finishProgress, [pathname, searchParams]);

  // clear timeout effect
  useEffect(() => {
    if (!isTimerRunning) {
      const timer = setTimeout(resetProgress, 200);
      return () => clearTimeout(timer);
    }
  }, [isTimerRunning]);

  // increse timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setProgress((prev) => prev + (80 - prev) * 0.005);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <ProgressbarContext.Provider value={{ startProgress }}>
      {isLoading && (
        <section
          aria-label='progress bar'
          style={{ height, background: color, width: `${progress}%` }}
          className='fixed top-0 left-0'
        />
      )}
      {children}
    </ProgressbarContext.Provider>
  );
};

export const useProgressbarContext = () => useContext(ProgressbarContext);
```

So that you can wrap this context in your layout:

```tsx:layout.tsx
import "./globals.css";

import { Footer, Navbar } from "@/components/server";
import {  ProgressbarContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <ProgressbarContextProvider>
          <Navbar />
          {children}
          <Footer />
        </ProgressbarContextProvider>
      </body>
    </html>
  );
}
```

You can have a try on my website:

- [https://mraddict.one](/)

## 5. Useful Links

- [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)
- [https://github.com/vercel/next.js/discussions/46478](https://github.com/vercel/next.js/discussions/46478)
- [https://github.com/joulev/nextjs13-appdir-router-events](https://github.com/joulev/nextjs13-appdir-router-events)
