import React from "react";

// Мини-иконки без внешних пакетов
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.9v-7h-2.54v-2.9h2.54V9.8c0-2.52 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33v7C18.34 21.25 22 17.09 22 12.07z"/>
  </svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm5.75-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);
const TelegramIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.04 15.47 8.9 19.2c.31 0 .45-.13.61-.29l1.46-1.4 3.03 2.23c.55.31.94.15 1.1-.51l2-9.38c.18-.84-.3-1.17-.84-.96L5.5 11.46c-.8.31-.78.76-.14.96l3.96 1.23 7.34-4.64-7.62 6.46z"/>
  </svg>
);

const colors = {
  primary: "#1F5A4F",
  accent:  "#F37483",
  brandBlue: "#87CEEB",
};

// TODO: замени ссылки на свои
const LINKS = {
  fb:  "https://facebook.com/yourpage",
  ig:  "https://instagram.com/yourpage",
  tg:  "https://t.me/yourusername",
};

export default function SocialBar() {
  return (
    <>
      {/* DESKTOP / TABLET: вертикальная плашка справа */}
      <div className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-5 z-40 flex-col gap-2">
        <a
          href={LINKS.fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
          className="h-11 w-11 grid place-items-center rounded-full shadow border transition hover:scale-105"
          style={{ background: `${colors.brandBlue}22`, borderColor: `${colors.primary}22`, color: colors.primary }}
        >
          <FacebookIcon />
        </a>
        <a
          href={LINKS.ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
          className="h-11 w-11 grid place-items-center rounded-full shadow border transition hover:scale-105"
          style={{ background: `${colors.accent}18`, borderColor: `${colors.primary}22`, color: colors.accent }}
        >
          <InstagramIcon />
        </a>
        <a
          href={LINKS.tg} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
          className="h-11 w-11 grid place-items-center rounded-full shadow border transition hover:scale-105"
          style={{ background: `${colors.primary}18`, borderColor: `${colors.primary}22`, color: colors.primary }}
        >
          <TelegramIcon />
        </a>
      </div>

      {/* MOBILE: нижняя лаконичная панель */}
      <div className="md:hidden fixed bottom-3 inset-x-0 z-40 px-3">
        <div
          className="mx-auto max-w-md rounded-2xl shadow-lg border backdrop-blur bg-white/90"
          style={{ borderColor: `${colors.primary}22` }}
        >
          <div className="grid grid-cols-3 divide-x"
               style={{ borderColor: `${colors.primary}12` }}>
            <a
              href={LINKS.fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="h-12 grid place-items-center"
              style={{ color: colors.primary }}
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={LINKS.ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="h-12 grid place-items-center"
              style={{ color: colors.accent }}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={LINKS.tg} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
              className="h-12 grid place-items-center"
              style={{ color: colors.primary }}
            >
              <TelegramIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
