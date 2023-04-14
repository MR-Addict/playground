import SanityClient from "next-sanity-client";

import { env } from "@/types/env";

const sanityClient = new SanityClient({
  dataset: "production",
  apiVersion: "v2021-10-21",
  projectId: env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
});

export default sanityClient;
