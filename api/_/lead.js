// api/lead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, contact, message } = req.body || {}

  const text =
    `🐾 <b>Нова заявка Pet Balance</b>\n` +
    `👤 Ім’я: ${name}\n` +
    `☎️ Контакт: ${contact}\n` +
    `📝 Запит: ${message || '-'}`

  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML'
    })
  })

  res.status(200).json({ ok: true })
}
