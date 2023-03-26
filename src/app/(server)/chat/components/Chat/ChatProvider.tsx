"use client";

import { MessageType, Message } from "@/types/chatgpt";
import { createContext, useContext, useState } from "react";

const defaultMessages: MessageType[] = [];

interface ChatContextProps {
  userInput: string;
  messages: MessageType[];
  chatgptStatus: "idle" | "thinking" | "error";
  resetMessages: () => void;
  setUserInput: (value: string) => void;
  setMessages: (messages: MessageType[]) => void;
  generateResponse: (messages: MessageType[]) => void;
  setChatgptStatus: (status: "idle" | "thinking" | "error") => void;
}

const ChatContext = createContext<ChatContextProps>({
  userInput: "",
  chatgptStatus: "idle",
  messages: defaultMessages,
  resetMessages: () => {},
  setUserInput: (value: string) => {},
  setMessages: (messages: MessageType[]) => {},
  generateResponse: (messages: MessageType[]) => {},
  setChatgptStatus: (status: "idle" | "thinking" | "error") => {},
});

export const ChatContextProvider: React.FC<{ openAIApiKey: string; children: React.ReactNode }> = ({
  openAIApiKey,
  children,
}) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState(defaultMessages);
  const [chatgptStatus, setChatgptStatus] = useState<"idle" | "thinking" | "error">("idle");

  function resetMessages() {
    setChatgptStatus("idle");
    setMessages(defaultMessages);
  }

  function generateResponse(messages: MessageType[]) {
    setChatgptStatus("thinking");

    fetch("https://api.mraddict.one/openai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: openAIApiKey },
      body: JSON.stringify({ model: "gpt-3.5-turbo", messages }),
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
        messages,
        userInput,
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
