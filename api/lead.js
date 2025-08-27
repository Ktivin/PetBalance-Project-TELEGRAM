export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    const { name, contact, message } = req.body || {};
    if (!name || !contact)
      return res
        .status(400)
        .json({ ok: false, error: 'Missing required fields' });

    const text =
      `🐾 <b>Нова заявка Pet Balance</b>\n` +
      `👤 Ім’я: ${name}\n` +
      `☎️ Контакт: ${contact}\n` +
      `📝 Запит: ${message || '-'}`;

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return res
        .status(500)
        .json({ ok: false, error: `Telegram error: ${r.status} ${t}` });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}
