import { clean, FORMS, isFormId, validate, visibleFields, type FormId } from "@/components/careers/forms";

/* Receives the site's application forms: the career application (`form:
   "career"`, the careers page's dialog in components/careers/CareerApplication.tsx),
   the regional partner and ambassador application (`form: "partner"`, on
   /community/partners) and the TX Community interest form (`form:
   "community"`, on the other /community pages). Each is checked against the
   same spec the page renders from.

   Delivery: set CAREERS_WEBHOOK_URL to any endpoint that accepts a JSON POST
   — an HR inbox flow, a Make / Zapier / n8n webhook, a CRM — and each request
   is forwarded there. Without it, applications follow CONTACT_WEBHOOK_URL.
   With neither, development logs the request and production answers 503, so
   a missing setting can't silently drop applications. */

/* The names the receiving flow already sorts careers requests by. */
const WEBHOOK_FORM_NAMES: Record<FormId, string> = {
  career: "careers",
  partner: "careers-partner",
  community: "community",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  if (!isFormId(input.form) || !input.values || typeof input.values !== "object") {
    return Response.json({ error: "invalid_submission" }, { status: 422 });
  }

  const spec = FORMS[input.form];
  const values = clean(spec, input.values as Record<string, unknown>);
  if (Object.keys(validate(spec, values, input.consent === true)).length > 0) {
    return Response.json({ error: "invalid_submission" }, { status: 422 });
  }

  /* Forward the readable labels rather than the internal option keys. */
  const submission: Record<string, string | string[]> = {};
  for (const field of visibleFields(spec, values)) {
    const value = values[field.name];
    const label = (key: string) => field.options?.find((option) => option.value === key)?.label ?? key;
    submission[field.name] = Array.isArray(value) ? value.map(label) : label(value);
  }

  const webhook = process.env.CAREERS_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[careers] CAREERS_WEBHOOK_URL is not set; request:", { form: spec.id, ...submission });
      return Response.json({ ok: true });
    }
    console.error("[careers] CAREERS_WEBHOOK_URL is not set; request not delivered.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: WEBHOOK_FORM_NAMES[spec.id],
        ...submission,
        submittedAt: new Date().toISOString(),
        source: request.headers.get("referer") ?? "transformix-careers",
      }),
    });
    if (!response.ok) throw new Error(`webhook answered ${response.status}`);
  } catch (error) {
    console.error("[careers] delivery failed:", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
