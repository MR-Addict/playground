"use client";

import { createContext, useContext, useState } from "react";

export interface ResultType {
  base64: string;
  type: "png" | "jpeg" | "webp";
  status: "idle" | "success" | "fail" | "processing";
}

interface CaptureContextProps {
  result: ResultType;
  setResult: (result: ResultType) => void;
}

const CaptureContext = createContext<CaptureContextProps>({
  result: { base64: "", type: "png", status: "idle" },
  setResult: (result: ResultType) => {},
});

export const CaptureContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [result, setResult] = useState<ResultType>({ base64: "", type: "png", status: "idle" });

  return <CaptureContext.Provider value={{ result, setResult }}>{children}</CaptureContext.Provider>;
};

export const useCaptureContext = () => useContext(CaptureContext);
