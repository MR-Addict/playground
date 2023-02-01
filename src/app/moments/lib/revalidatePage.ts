"use client";

export default function revalidatePage() {
  fetch(`/api/moments/revalidate`)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) console.error(result.message);
    })
    .catch((error) => console.error(error));
}
