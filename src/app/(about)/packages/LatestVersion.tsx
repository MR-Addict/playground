"use client";

import { useEffect, useState } from "react";

export default function LatestVersion({ name, currentVersion }: { name: string; currentVersion: string }) {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    function fetchVersion(name: string) {
      fetch(`https://registry.npmjs.org/${name}/latest`)
        .then((res) => res.json())
        .then((result) => setVersion(result?.version))
        .catch(() => console.error(`Failed to fetch ${name} latest version`));
    }
    fetchVersion(name);
  }, []);

  return (
    <>
      {version && version !== currentVersion && (
        <p className="absolute top-0 left-[110%] bg-green-600 text-white py-0.5 px-1 rounded-[4px] text-xs">
          {version}
        </p>
      )}
    </>
  );
}
