"use client";

import { createContext, useContext, useState } from "react";

import LoginForm from "./LoginForm";

interface LoginContextProps {
  isLoggingIn: boolean;
  openLoginForm: (value: boolean) => void;
  setIsLoggingIn: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextProps>({
  isLoggingIn: false,
  openLoginForm: (value: boolean) => {},
  setIsLoggingIn: (value: boolean) => {},
});

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function openLoginForm(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <LoginContext.Provider value={{ openLoginForm, isLoggingIn, setIsLoggingIn }}>
      <LoginForm isOpenForm={isOpenForm} />
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
