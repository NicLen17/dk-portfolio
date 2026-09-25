import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const dynamic = "force-dynamic";

type WebhookPayload = {
  _type?: string;
  tags?: string[];
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    // If a secret is configured, enforce cryptographic signature validation
    if (secret) {
      const { isValidSignature, body } = await parseBody<WebhookPayload>(
        req,
        secret,
        true // Add delay to allow CDN replication
      );

      if (!isValidSignature) {
        return new Response("Invalid signature", { status: 401 });
      }

      if (body) {
        if (Array.isArray(body.tags) && body.tags.length > 0) {
          body.tags.forEach((tag) => revalidateTag(tag));
          return NextResponse.json({ revalidated: body.tags });
        }

        if (body._type) {
          revalidateTag(body._type);
          return NextResponse.json({ revalidated: [body._type] });
        }
      }
    } else {
      // In development or when webhook secret is not yet set
      const body = (await req.json()) as WebhookPayload;
      if (body._type) {
        revalidateTag(body._type);
        return NextResponse.json({ revalidated: [body._type] });
      }
    }

    return new Response("No tags or document type to revalidate", { status: 400 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
