import Client from "./Client";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("Tools • HTML Playground");

export default function Page() {
  return <Client />;
}
