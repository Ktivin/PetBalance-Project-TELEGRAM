import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const colors = {
  primary: "#1F5A4F",
  text: "#0f172a",
  accent: "#F37483",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  // закрывать меню при переходе по ссылке
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header
      className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      style={{ borderColor: `${colors.primary}14` }}
    >
      {/* top bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Лого → на главную */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="На головну">
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-xl object-cover" />
          {/* на телефоне прячем подпись, чтобы было лаконично */}
          <span className="hidden sm:inline font-semibold" style={{ color: colors.text }}>
            Pet Balance
          </span>
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/experts" className="hover:opacity-80">Експерти</Link>
          <a href="/#how" className="hover:opacity-80">Як це працює</a>
          <a href="/#faq" className="hover:opacity-80">FAQ</a>
          <a
            href="/#book"
            className="rounded-xl px-3 py-2 font-medium shadow-sm hover:shadow transition"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, color: "#fff" }}
          >
            Записатися
          </a>
        </nav>

        {/* Мобильный бургер */}
        <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-xl border"
          style={{ borderColor: `${colors.primary}22`, color: colors.primary }}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* иконка-бургер/крестик без внешних пакетов */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="transition">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Мобильная панель */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-4 pb-4">
          <div className="grid gap-1">
            <Link
              to="/experts"
              className="rounded-xl px-3 py-3 text-[15px] bg-white border"
              style={{ borderColor: `${colors.primary}14` }}
            >
              Експерти
            </Link>
            <a
              href="/#how"
              className="rounded-xl px-3 py-3 text-[15px] bg-white border"
              style={{ borderColor: `${colors.primary}14` }}
            >
              Як це працює
            </a>
            <a
              href="/#faq"
              className="rounded-xl px-3 py-3 text-[15px] bg-white border"
              style={{ borderColor: `${colors.primary}14` }}
            >
              FAQ
            </a>
            <a
              href="/#book"
              className="mt-2 rounded-xl px-3 py-3 font-semibold text-center shadow-sm hover:shadow transition"
              style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, color: "#fff" }}
            >
              Записатися
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
