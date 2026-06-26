import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const CONTACT_EMAIL = "contact@albertai.fr";
// Resend test mode: emails can only be sent to the account owner until a domain is verified.
// Once your domain is verified at resend.com/domains, set FROM_EMAIL to e.g. "COAL <hello@yourdomain.com>"
// and remove the RESEND_TEST_OVERRIDE below.
const FROM_EMAIL = "COAL <onboarding@resend.dev>";
const RESEND_TEST_OVERRIDE = "cantom.neves@gmail.com"; // remove once domain is verified

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured in Supabase secrets" };
  }
  // In test mode, Resend only allows sending to the account owner.
  // RESEND_TEST_OVERRIDE redirects all emails to that address with the original recipient noted in the subject.
  const effectiveTo = RESEND_TEST_OVERRIDE || params.to;
  const effectiveSubject = RESEND_TEST_OVERRIDE && RESEND_TEST_OVERRIDE !== params.to
    ? `${params.subject} [→ ${params.to}]`
    : params.subject;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: effectiveTo,
        subject: effectiveSubject,
        html: params.html,
        reply_to: params.replyTo,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend API error ${res.status}: ${body}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Network error calling Resend: ${String(e)}` };
  }
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function baseEmailShell(title: string, inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e4e4e7">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px">
    <div style="font-weight:900;font-size:22px;letter-spacing:-0.02em;margin-bottom:32px">COAL<span style="color:#E8500A">.</span></div>
    <h1 style="font-size:24px;font-weight:900;letter-spacing:-0.02em;margin:0 0 24px">${title}<span style="color:#E8500A">.</span></h1>
    ${inner}
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid #27272a;font-size:12px;color:#71717a;letter-spacing:0.1em;text-transform:uppercase">COAL — Orchestration par Intelligence Artificielle</div>
  </div></body></html>`;
}

app.get("/make-server-80f7bc56/health", (c) => c.json({ status: "ok" }));

// Contact form submission
app.post("/make-server-80f7bc56/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return c.json({ error: "Missing required fields: name, email, subject, message" }, 400);
    }

    const id = `contact:${Date.now()}:${crypto.randomUUID()}`;
    await kv.set(id, { type: "contact", name, email, company, subject, message, createdAt: new Date().toISOString() });

    const internalHtml = baseEmailShell(
      "Nouveau message de contact",
      `<table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:140px">Nom</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Société</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(company || "—")}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Objet</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(subject)}</td></tr>
      </table>
      <div style="background:#18181b;padding:20px;border-left:3px solid #E8500A;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>`
    );

    const confirmationHtml = baseEmailShell(
      "Message bien reçu",
      `<p style="color:#a1a1aa;line-height:1.6;margin:0 0 16px">Bonjour ${escapeHtml(name)},</p>
      <p style="color:#a1a1aa;line-height:1.6;margin:0 0 16px">Nous avons bien reçu votre message et reviendrons vers vous sous 24h ouvrées.</p>
      <div style="background:#18181b;padding:20px;border-left:3px solid #E8500A;margin:24px 0">
        <p style="margin:0 0 8px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Votre message</p>
        <p style="margin:0;color:#e4e4e7;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      </div>
      <p style="color:#a1a1aa;line-height:1.6;margin:0">À très vite,<br/>L'équipe COAL</p>`
    );

    const [internal, confirm] = await Promise.all([
      sendEmail({
        to: CONTACT_EMAIL,
        subject: `[COAL Contact] ${subject}`,
        html: internalHtml,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: "Votre message a bien été reçu — COAL",
        html: confirmationHtml,
      }),
    ]);

    if (!internal.ok) {
      console.log(`Contact form: failed to send internal notification: ${internal.error}`);
      return c.json({ error: `Email delivery failed: ${internal.error}` }, 500);
    }
    if (!confirm.ok) {
      console.log(`Contact form: failed to send user confirmation: ${confirm.error}`);
    }

    return c.json({ ok: true });
  } catch (e) {
    console.log(`Contact form handler error: ${String(e)}`);
    return c.json({ error: `Server error: ${String(e)}` }, 500);
  }
});

// Quiz funnel lead submission
app.post("/make-server-80f7bc56/quiz-lead", async (c) => {
  try {
    const body = await c.req.json();
    const { lead, answers } = body ?? {};
    if (!lead?.name || !lead?.email || !lead?.company) {
      return c.json({ error: "Missing lead fields: name, email, company" }, 400);
    }

    const id = `quiz:${Date.now()}:${crypto.randomUUID()}`;
    await kv.set(id, {
      type: "quiz-lead",
      lead,
      answers,
      createdAt: new Date().toISOString(),
    });

    const answersRows = Object.entries(answers ?? {})
      .map(
        ([k, v]) =>
          `<tr><td style="padding:10px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:180px">${escapeHtml(k)}</td><td style="padding:10px 0;border-bottom:1px solid #27272a">${escapeHtml(String(v))}</td></tr>`
      )
      .join("");

    const internalHtml = baseEmailShell(
      "Nouveau lead — Quiz Funnel",
      `<table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:140px">Nom</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(lead.email)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Société</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(lead.company)}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #27272a;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Téléphone</td><td style="padding:12px 0;border-bottom:1px solid #27272a">${escapeHtml(lead.phone || "—")}</td></tr>
      </table>
      <p style="color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin:24px 0 8px">Réponses du diagnostic</p>
      <table style="width:100%;border-collapse:collapse">${answersRows}</table>`
    );

    const leadHtml = baseEmailShell(
      "Votre diagnostic COAL",
      `<p style="color:#a1a1aa;line-height:1.6;margin:0 0 16px">Bonjour ${escapeHtml(lead.name)},</p>
      <p style="color:#a1a1aa;line-height:1.6;margin:0 0 24px">Merci pour le temps consacré au diagnostic. Sur la base de vos réponses, voici les premiers marqueurs identifiés pour <strong style="color:#e4e4e7">${escapeHtml(lead.company)}</strong> :</p>
      <div style="background:#18181b;padding:24px;border-left:3px solid #E8500A;margin:0 0 24px">
        <p style="margin:0 0 8px;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Potentiel identifié</p>
        <p style="margin:0;font-size:32px;font-weight:900;color:#e4e4e7">—68% <span style="font-size:14px;color:#a1a1aa;font-weight:400">de tâches manuelles récupérables</span></p>
      </div>
      <p style="color:#a1a1aa;line-height:1.6;margin:0 0 16px">Un consultant COAL vous contactera sous 24h ouvrées pour explorer les quick-wins prioritaires sur votre stack opérationnelle.</p>
      <p style="color:#a1a1aa;line-height:1.6;margin:24px 0 0">À très vite,<br/>L'équipe COAL</p>`
    );

    const [internal, confirm] = await Promise.all([
      sendEmail({
        to: CONTACT_EMAIL,
        subject: `[COAL Lead] ${lead.company} — ${lead.name}`,
        html: internalHtml,
        replyTo: lead.email,
      }),
      sendEmail({
        to: lead.email,
        subject: "Votre diagnostic COAL est prêt",
        html: leadHtml,
      }),
    ]);

    if (!internal.ok) {
      console.log(`Quiz lead: failed to send internal notification: ${internal.error}`);
      return c.json({ error: `Email delivery failed: ${internal.error}` }, 500);
    }
    if (!confirm.ok) {
      console.log(`Quiz lead: failed to send user email: ${confirm.error}`);
    }

    return c.json({ ok: true });
  } catch (e) {
    console.log(`Quiz lead handler error: ${String(e)}`);
    return c.json({ error: `Server error: ${String(e)}` }, 500);
  }
});

Deno.serve(app.fetch);