"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface ProgressbarContextProps {
  startProgress: () => void;
}

const ProgressbarContext = createContext<ProgressbarContextProps>({
  startProgress: () => {}
});

interface ProgressbarContextProviderProps {
  children: React.ReactNode;
  height?: number;
  color?: string;
}

export const ProgressbarContextProvider = ({
  children,
  height = 2,
  color = "#16a34a"
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
          aria-label="progress bar"
          style={{ height, background: color, width: `${progress}%` }}
          className="fixed top-0 left-0"
        />
      )}
      {children}
    </ProgressbarContext.Provider>
  );
};

export const useProgressbarContext = () => useContext(ProgressbarContext);
