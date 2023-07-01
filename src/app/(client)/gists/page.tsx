import { HiOutlineCodeBracketSquare } from "react-icons/hi2";

import { setMetadata } from "@/lib/utils";
import { checkPerm } from "@/lib/auth/checkPerm";
import { fetchAndSerializeGists } from "@/lib/gist";
import { Gist, TimeAgo } from "@/components/client";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Gists");

export default async function Page() {
  const [session, gists] = await Promise.all([pageSession(), fetchAndSerializeGists()]);
  const permission = checkPerm(session?.user.role || "vistor", "admin");

  return (
    <div className="w-full flex flex-col gap-10">
      {gists
        .filter((gist) => gist.public || permission)
        .map((gist) => (
          <div key={gist._id}>
            <div className="flex items-start flex-row gap-1">
              <div className="w-3 h-3 border-4 border-green-600 rounded-full mt-2"></div>

              <div className="flex flex-col md:flex-row md:items-center md:gap-1">
                <h1 className="text-lg text-gray-700">{gist.title}</h1>

                <div className="flex flex-row items-center gap-1">
                  <p className="text-sm text-gray-500">
                    Last update <TimeAgo date={gist._updatedAt} />
                  </p>
                  {permission && (
                    <a
                      href="https://mraddict.sanity.studio"
                      target="_blank"
                      aria-label="studio link"
                      className="text-gray-500 mt-1 hover:text-blue-600"
                    >
                      <HiOutlineCodeBracketSquare size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {gist.files.map((item) => (
                <Gist key={item.filename} serializedMDX={item.serializedMDX} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
