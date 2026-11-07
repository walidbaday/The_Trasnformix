import { createTransport } from "nodemailer";
import { clean, validate, visibleFields } from "@/components/careers/forms";
import {
  getPartnershipPath,
  isPartnershipPathId,
  PARTNERSHIP_FORMS,
} from "@/lib/partnerships";

/* Receives the partnerships modal (components/contact/PartnershipModal.tsx):
   the path picked and the answers to its form, checked against the same spec
   the modal renders from, and emails them to the team.

   Delivery is plain SMTP, so any mailbox works (Google Workspace, Microsoft
   365, Zoho, the host's own mail server):
     SMTP_HOST, SMTP_PORT (587 by default; 465 connects over TLS),
     SMTP_USER, SMTP_PASS, and optionally
     MAIL_FROM             the sender, when it isn't SMTP_USER itself
     PARTNERSHIPS_MAIL_TO  the inbox, Info@thetransformix.com by default.
   Replying to the email answers the person who sent the request. Without
   SMTP_HOST, development logs the email and production answers 503, so a
   missing setting can't silently drop requests. */

const MAIL_TO = process.env.PARTNERSHIPS_MAIL_TO || "Info@thetransformix.com";

/* A light brake on repeat senders: a handful of requests per address in any
   ten minutes. Kept in memory, which suits the single server it runs on. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function tooMany(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) {
    for (const [other, times] of recent) {
      if (times.every((time) => now - time >= WINDOW_MS)) recent.delete(other);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  if (!isPartnershipPathId(input.path) || !input.values || typeof input.values !== "object") {
    return Response.json({ error: "invalid_submission" }, { status: 422 });
  }

  /* The hidden field only a bot fills in: answer as if sent, send nothing. */
  if (typeof input.fax === "string" && input.fax.trim()) {
    return Response.json({ ok: true });
  }

  const path = getPartnershipPath(input.path);
  /* The /contact page asks every path with its own short form. */
  const spec = PARTNERSHIP_FORMS[input.form === "contact" ? "contact" : path.form];
  const values = clean(spec, input.values as Record<string, unknown>);
  if (Object.keys(validate(spec, values, input.consent === true)).length > 0) {
    return Response.json({ error: "invalid_submission" }, { status: 422 });
  }

  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (tooMany(address)) {
    return Response.json({ error: "too_many_requests" }, { status: 429 });
  }

  /* The email lists the readable labels rather than the internal option keys. */
  const rows: { label: string; value: string }[] = [
    { label: "المسار", value: `${path.title} · ${path.en}` },
    { label: "النموذج", value: `${spec.title} · ${spec.eyebrow.split("·").pop()!.trim()}` },
  ];
  for (const field of visibleFields(spec, values)) {
    const value = String(values[field.name] ?? "");
    if (!value) continue;
    rows.push({
      label: field.label,
      value: field.options?.find((option) => option.value === value)?.label ?? value,
    });
  }
  rows.push({ label: "لغة الصفحة", value: input.lang === "en" ? "English" : "العربية" });

  const name = String(values.fullName);
  const email = String(values.email);
  const company = String(values.company ?? "");
  const subject = oneLine(
    `طلب جديد · ${path.title} — ${name}${company ? ` (${company})` : ""}`,
  );
  const text = rows.map(({ label, value }) => `${label}:\n${value}`).join("\n\n");
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <body style="margin:0;padding:24px;background:#f5f7fb;font-family:Tahoma,Arial,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
      <tr>
        <td style="padding:24px 28px;border-bottom:3px solid #1c4499;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;color:#1c4499;">TRANSFORMIX · CONTACT &amp; PARTNERSHIPS</p>
          <h1 style="margin:0;font-size:20px;color:#142441;">${escapeHtml(path.title)}</h1>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;" dir="ltr">${escapeHtml(path.en)}</p>
        </td>
      </tr>
      ${rows
        .map(
          ({ label, value }) => `<tr>
        <td style="padding:14px 28px;border-bottom:1px solid #eef0f4;text-align:right;">
          <p style="margin:0 0 4px;font-size:12px;color:#57585b;">${escapeHtml(label)}</p>
          <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-line;" dir="auto">${escapeHtml(value)}</p>
        </td>
      </tr>`,
        )
        .join("\n      ")}
      <tr>
        <td style="padding:16px 28px;font-size:12px;color:#57585b;text-align:right;">
          أُرسل من ${spec.id === "contact" ? "صفحة تواصل معنا" : "نافذة التواصل والشراكات"} في موقع ترانسفورمكس. الرد على هذه الرسالة يصل إلى ${escapeHtml(email)}.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const host = process.env.SMTP_HOST;
  if (!host) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[partnerships] SMTP_HOST is not set; email to ${MAIL_TO}:\n${subject}\n\n${text}`);
      return Response.json({ ok: true });
    }
    console.error("[partnerships] SMTP_HOST is not set; request not delivered.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const from = process.env.MAIL_FROM || user;
  if (!from) {
    console.error("[partnerships] Set MAIL_FROM or SMTP_USER for the sender address.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const transport = createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: user ? { user, pass: process.env.SMTP_PASS ?? "" } : undefined,
    });
    await transport.sendMail({
      from: { name: "Transformix Website", address: from },
      to: MAIL_TO,
      replyTo: { name, address: email },
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("[partnerships] delivery failed:", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
