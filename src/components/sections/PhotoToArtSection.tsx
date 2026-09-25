import { sanityFetch } from "@/sanity/fetch";
import { CREATIVE_SIGNATURE_QUERY } from "@/sanity/queries";
import type { SanityCreativeSignature } from "@/sanity/types";
import { PhotoToArtShowcase } from "./PhotoToArtShowcase";

// Server Component fetching Creative Signature process data from Sanity
export async function PhotoToArtSection() {
  const data = await sanityFetch<SanityCreativeSignature>({
    query: CREATIVE_SIGNATURE_QUERY,
    tags: ["creativeSignature"],
    revalidate: 60,
  });

  return <PhotoToArtShowcase data={data} />;
}
