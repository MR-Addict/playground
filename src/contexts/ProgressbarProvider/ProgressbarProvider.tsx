"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface ProgressbarContextProps {
  setIsLoading: (value: boolean) => void;
}

const ProgressbarContext = createContext<ProgressbarContextProps>({
  setIsLoading: (value: boolean) => {},
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setIsLoading(false), [pathname, searchParams]);

  return (
    <ProgressbarContext.Provider value={{ setIsLoading }}>
      <section
        aria-label='progress bar'
        style={{ height, background: color, width: isLoading ? "50%" : "0%" }}
        className='fixed top-0 left-0'
      ></section>
      {children}
    </ProgressbarContext.Provider>
  );
};

export const useProgressbarContext = () => useContext(ProgressbarContext);
