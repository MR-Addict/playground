import fetchMoments from "./fetchMoments";

import Moments from "./Moments";

export default async function Page() {
  const moments = await fetchMoments();

  return <Moments moments={moments.data} />;
}
