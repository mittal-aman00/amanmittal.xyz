import { NextResponse } from "next/server";

type ContactBody = {
  from_name?: string;
  from_email?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot - bots that fill hidden fields are silently accepted.
  if (body.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const fromName = body.from_name?.trim() ?? "";
  const fromEmail = body.from_email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!fromName || !fromEmail || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 }
    );
  }

  if (!privateKey) {
    console.error(
      "EMAILJS_PRIVATE_KEY is missing. EmailJS Account → Security has Use Private Key enabled."
    );
    return NextResponse.json(
      {
        error:
          "EMAILJS_PRIVATE_KEY is missing. Add it from EmailJS Account → Security.",
      },
      { status: 503 }
    );
  }

  const payload: Record<string, unknown> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey,
    // Must match the EmailJS template variables:
    // {{name}}, {{mail}}, {{message}}, {{reply_to}}
    template_params: {
      name: fromName,
      mail: fromEmail,
      message,
      reply_to: fromEmail,
    },
  };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("EmailJS send failed:", response.status, detail);
    return NextResponse.json(
      {
        error: "Failed to send message.",
        detail: detail.slice(0, 200),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
