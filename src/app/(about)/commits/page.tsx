import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/commits/1");
  return <h1>Redirecting...</h1>;
}
