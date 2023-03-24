import Client from "./Client";
import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("HTML Playground • Tools");

export default function Page() {
  return <Client />;
}
