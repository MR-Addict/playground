"use client";

import { createContext, useContext, useState } from "react";

import LoginForm from "./LoginForm";

interface LoginContextProps {
  openLoginForm: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextProps>({
  openLoginForm: (value: boolean) => {},
});

export const LoginContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openLoginForm(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <LoginContext.Provider value={{ openLoginForm }}>
      <LoginForm isOpenForm={isOpenForm} />
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
