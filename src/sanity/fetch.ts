import type { QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T | null> {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const mergedParams = { lang: "en", ...params };
    return await client.fetch<T>(query, mergedParams, {
      ...(isDev
        ? { cache: "no-store" }
        : {
            next: {
              revalidate: tags.length ? false : revalidate,
              tags,
            },
          }),
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
