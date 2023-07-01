import LinkCard from "../LinkCard/LinkCard";
import { links } from "../../config";
import { ClientLink } from "@/components/client";

export default function NormalLinks() {
  return (
    <section aria-label="mobile footer links" className="hidden md:flex w-full flex-row items-start justify-between">
      <ul className="hidden md:flex w-full flex-row items-start justify-between">
        {links.map((item1, index1) => (
          <li key={index1} className="flex flex-col gap-5">
            <h1 className="text-gray-700">{item1.head}</h1>
            <div className="flex flex-col gap-1">
              {item1.data.map((item2, index2) => (
                <LinkCard link={item2} key={index2} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <ClientLink href="/" className="text-green-600 text-2xl font-bold italic w-1/2 text-end">
        Playground
      </ClientLink>
    </section>
  );
}
