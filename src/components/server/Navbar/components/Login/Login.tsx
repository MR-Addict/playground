"use client";

import { useSession } from "next-auth/react";

import Usericon from "../Usericon/Usericon";
import LoginButton from "../LoginButton/LoginButton";

export default function Login() {
  const { data: session } = useSession();

  if (session) return <Usericon session={session} />;
  else return <LoginButton />;
}
