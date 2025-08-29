// api/lead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { name, contact, message, utm = {} } = req.body || {};
    if (!name || !contact) return res.status(400).json({ ok: false, error: 'Missing required fields' });

    const lines = [
      '🐾 <b>Нова заявка Pet Balance</b>',
      `👤 Ім’я: ${escapeHtml(name)}`,
      `☎️ Контакт: ${escapeHtml(contact)}`,
      `📝 Запит: ${escapeHtml(message || '-')}`,
    ];

    const extras = [
      utm.source   ? `utm_source: ${escapeHtml(utm.source)}` : '',
      utm.medium   ? `utm_medium: ${escapeHtml(utm.medium)}` : '',
      utm.campaign ? `utm_campaign: ${escapeHtml(utm.campaign)}` : '',
      utm.content  ? `utm_content: ${escapeHtml(utm.content)}` : '',
      utm.term     ? `utm_term: ${escapeHtml(utm.term)}` : '',
      utm.referrer ? `ref: ${escapeHtml(utm.referrer)}` : '',
      utm.page_url ? `url: ${escapeHtml(utm.page_url)}` : '',
    ].filter(Boolean);

    if (extras.length) {
      lines.push('');
      lines.push('🔎 <b>Джерело</b>');
      lines.push(...extras);
    }

    const text = lines.join('\n');

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return res.status(500).json({ ok: false, error: 'Server not configured' });

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const tg = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!tg.ok) {
      const txt = await tg.text().catch(() => '');
      return res.status(500).json({ ok: false, error: `Telegram error: ${tg.status} ${txt}` });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}