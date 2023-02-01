"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function revalidatePage(router: AppRouterInstance) {
  fetch(`/api/moments/revalidate`)
    .then((res) => res.json())
    .then((result) => {
      if (result.status) router.refresh();
      else console.error(result.message);
    })
    .catch((error) => console.error(error));
}
