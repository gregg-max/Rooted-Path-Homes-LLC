import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { callFallback, isAllowedForwardUrl, validateSubmission } from "@/lib/forms";
import { siteConfig } from "@/lib/site";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 20;
const hits = new Map<string, number[]>();

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "local";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }
  return false;
}

async function saveLocal(record: object) {
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const line =
    JSON.stringify({
      id: randomUUID(),
      receivedAt: new Date().toISOString(),
      ...record,
    }) + "\n";
  await appendFile(path.join(dir, "submissions.jsonl"), line, "utf8");
}

export async function POST(request: Request) {
  if (limited(clientKey(request))) {
    return json(
      {
        ok: false,
        error: `That's a lot of notes in a short time. Wait a few minutes, or call ${siteConfig.phoneDisplay}.`,
      },
      429,
    );
  }

  const text = await request.text();
  if (text.length > 30_000) {
    return json({ ok: false, error: "That note is a bit too long. Shorten it and try again." }, 413);
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "We could not read that. Please try again." }, 400);
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const trap = (data as Record<string, unknown>).company_website;
    if (typeof trap === "string" && trap.trim()) {
      return json({ ok: true, delivery: "ignored" });
    }
  }

  const parsed = validateSubmission(data);
  if (!parsed.ok) {
    return json({ ok: false, error: parsed.error, fieldErrors: parsed.fieldErrors }, 400);
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (accessKey) {
    const endpoint = process.env.WEB3FORMS_ENDPOINT?.trim() || "https://api.web3forms.com/submit";
    if (!isAllowedForwardUrl(endpoint)) {
      return json(
        { ok: false, error: `The form service address is not one we can use. ${callFallback()}` },
        500,
      );
    }
    return json({
      ok: true,
      delivery: "web3forms",
      forward: {
        url: endpoint,
        body: {
          access_key: accessKey,
          subject: parsed.subject,
          from_name: "Rooted Path Homes website",
          name: parsed.name,
          email: parsed.email,
          replyto: parsed.email,
          message: parsed.message,
        },
      },
    });
  }

  const localSink =
    process.env.NODE_ENV !== "production" || process.env.FORM_SINK === "local";
  if (localSink) {
    await saveLocal({ form: parsed.form, subject: parsed.subject, fields: parsed.fields });
    return json({ ok: true, delivery: "local" });
  }

  return json(
    {
      ok: false,
      error: `This form is not connected to email yet. ${callFallback()}`,
    },
    503,
  );
}
