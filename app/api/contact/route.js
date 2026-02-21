export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body?.email || "").trim();
    const telegram = (body?.telegram || "").trim();
    const message = (body?.message || "").trim();
    const source = (body?.source || "").trim();

    // Basic validation
    const eok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const tok = telegram.startsWith("@") && telegram.length >= 3;

    if (!eok || !tok) {
      return new Response("invalid_input", { status: 400 });
    }

    // 1) Telegram (recommended for now)
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      const text =
        `📩 [BODDARING 문의]\n` +
        `- Email: ${email}\n` +
        `- Telegram: ${telegram}\n` +
        `- Source: ${source || "unknown"}\n\n` +
        `${message || "(메시지 없음)"}`;

      const url = `https://api.telegram.org/bot${tgToken}/sendMessage`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text,
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        return new Response(`telegram_failed:${t}`, { status: 502 });
      }

      return new Response("ok", { status: 200 });
    }

    // 2) Email (optional) - call a provider via REST (Resend) without extra deps
    const resendKey = process.env.RESEND_API_KEY;
    const resendTo = process.env.RESEND_TO; // e.g. boddaring@endholdings.com
    const resendFrom = process.env.RESEND_FROM; // e.g. BODDARING <noreply@yourdomain.com>

    if (resendKey && resendTo && resendFrom) {
      const payload = {
        from: resendFrom,
        to: [resendTo],
        subject: `[BODDARING 문의] ${email} / ${telegram}`,
        text:
          `Email: ${email}\nTelegram: ${telegram}\nSource: ${source || "unknown"}\n\n${message || "(메시지 없음)"}`,
      };

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        return new Response(`email_failed:${t}`, { status: 502 });
      }

      return new Response("ok", { status: 200 });
    }

    // No delivery configured
    return new Response("no_delivery_configured", { status: 501 });
  } catch (e) {
    return new Response("server_error", { status: 500 });
  }
}
