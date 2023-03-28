"use client";

import { MessageType, Message, OptionsType } from "@/types/chatgpt";
import { createContext, useContext, useState } from "react";

const defaultMessages: MessageType[] = [];
const defaultOptions: OptionsType = { model: "gpt-3.5-turbo", temperature: 0.7, top_p: 0.9, max_tokens: 2048 };

interface ChatContextProps {
  userInput: string;
  options: OptionsType;
  messages: MessageType[];
  chatgptStatus: "idle" | "thinking" | "error";
  resetMessages: () => void;
  generateResponse: () => void;
  setUserInput: (value: string) => void;
  setOptions: (options: OptionsType) => void;
  setMessages: (messages: MessageType[]) => void;
  setChatgptStatus: (status: "idle" | "thinking" | "error") => void;
}

const ChatContext = createContext<ChatContextProps>({
  userInput: "",
  chatgptStatus: "idle",
  options: defaultOptions,
  messages: defaultMessages,
  resetMessages: () => {},
  generateResponse: () => {},
  setUserInput: (value: string) => {},
  setOptions: (options: OptionsType) => {},
  setMessages: (messages: MessageType[]) => {},
  setChatgptStatus: (status: "idle" | "thinking" | "error") => {},
});

export const ChatContextProvider: React.FC<{ openAIApiKey: string; children: React.ReactNode }> = ({
  openAIApiKey,
  children,
}) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(defaultMessages);
  const [options, setOptions] = useState<OptionsType>(defaultOptions);
  const [chatgptStatus, setChatgptStatus] = useState<"idle" | "thinking" | "error">("idle");

  function resetMessages() {
    setChatgptStatus("idle");
    setMessages(defaultMessages);
  }

  function generateResponse() {
    if (!messages.length) return;
    setChatgptStatus("thinking");

    fetch("https://api.mraddict.one/openai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: openAIApiKey },
      body: JSON.stringify({ ...options, messages }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.status) {
          console.error(result.message);
          setChatgptStatus("error");
        } else {
          const message = Message.parse(result.data.choices[0].message);
          setMessages([...messages, message]);
          setChatgptStatus("idle");
        }
      })
      .catch((error) => {
        console.error(error);
        setChatgptStatus("error");
      });
  }

  return (
    <ChatContext.Provider
      value={{
        options,
        messages,
        userInput,
        setOptions,
        setUserInput,
        generateResponse,
        chatgptStatus,
        resetMessages,
        setChatgptStatus,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
