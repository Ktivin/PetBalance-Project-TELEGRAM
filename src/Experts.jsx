// src/Experts.jsx
import React, { useMemo, useState } from "react";
import Header from "./components/Header";

// палитра под бренд
const colors = {
  primary: "#1F5A4F",
  accent:  "#F37483",
  light:   "#F2FAFD",
  text:    "#111827",
};

// 🔹 утил: инициалы
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() || "")
    .join("");
}

// 🔹 плейсхолдер аватарки (если нет фото)
function Avatar({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-16 w-16 rounded-xl object-cover border"
        style={{ borderColor: "#1F5A4F22" }}
        onError={(e) => { e.currentTarget.src = ""; e.currentTarget.onerror = null; }}
      />
    );
  }
  const initials = getInitials(name);
  return (
    <div
      className="h-16 w-16 rounded-xl grid place-items-center border text-lg font-semibold"
      style={{
        borderColor: "#1F5A4F22",
        color: colors.primary,
        background: `radial-gradient(120px 80px at 80% -20%, ${colors.accent}22, transparent 60%), 
                     radial-gradient(120px 80px at -20% 100%, ${colors.primary}18, transparent 60%), #fff`,
      }}
      aria-label={name}
    >
      {initials || "E"}
    </div>
  );
}

export default function Experts() {
  // данные — добавляй свои фото в /public/experts/*.jpg
  const allExperts = [
   {
      name: "Хохлачов Нікіта",
      role: "Лікар-стаціонар, терапія",
      tags: ["Терапія", "Аналізи", "24/7"],
      city: "Київ / Online",
      photo: "/experts/maria.jpg", // если файла нет — будет плейсхолдер
      rating: 5,
    },
    {
      name: "Марія Коваль",
      role: "Лікар-стаціонар, терапія",
      tags: ["Терапія", "Аналізи", "24/7"],
      city: "Київ / Online",
      photo: "/experts/maria.jpg", // если файла нет — будет плейсхолдер
      rating: 5,
    },
    {
      name: "Олександр Гнатюк",
      role: "Кінолог",
      tags: ["Безпека", "Слухняність"],
      city: "Львів / Online",
      photo: "/experts/oleksandr.jpg",
      rating: 5,
    },
    {
      name: "Євгенія Литвин",
      role: "Дерматологія",
      tags: ["Шкіра", "Алергії", "Лабораторія"],
      city: "Одеса / Online",
      photo: "", // нет фото → плейсхолдер
      rating: 4,
    },
    {
      name: "Ірина Дорош",
      role: "Нутриціолог",
      tags: ["Харчування", "Дієта", "Вага"],
      city: "Прага / Online",
      photo: "/experts/iryna.jpg",
      rating: 5,
    },
  ];

  const domains = ["Усі", "Ветеринарія", "Кінологія", "Зоопсихологія", "Дерматологія", "Нутриціологія"];
  const [active, setActive] = useState("Усі");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return allExperts.filter((e) => {
      const matchesDomain =
        active === "Усі" ||
        (active === "Ветеринарія" && /лікар|терап|вет/i.test(e.role)) ||
        (active === "Кінологія" && /кінолог/i.test(e.role)) ||
        (active === "Зоопсихологія" && /зоопсих/i.test(e.role)) ||
        (active === "Дерматологія" && /дермат/i.test(e.role)) ||
        (active === "Нутриціологія" && /нутриц|харч/i.test(e.role));

      const q = query.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.tags.join(" ").toLowerCase().includes(q) ||
        (e.city || "").toLowerCase().includes(q);

      return matchesDomain && matchesSearch;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen" style={{
      background: `radial-gradient(1200px 600px at 100% -10%, ${colors.accent}10 0%, transparent 60%),
                   radial-gradient(1000px 500px at -10% 0%, ${colors.primary}10 0%, transparent 60%), #faf9fb`
    }}>
      {/* общий хедер со ссылкой-логотипом */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero-полоска страницы */}
        <section
          className="rounded-3xl p-6 border mb-6"
          style={{
            borderColor: `${colors.primary}22`,
            background: `linear-gradient(135deg, #fff, ${colors.light})`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div
                className="inline-block text-xs font-semibold rounded-full px-3 py-1 border"
                style={{ color: colors.primary, borderColor: `${colors.primary}30`, background: `${colors.primary}0D` }}
              >
                Команда Pet Balance
              </div>
              <h1 className="mt-3 text-3xl font-bold" style={{ color: colors.text }}>
                Наші експерти
              </h1>
              <p className="mt-2 text-zinc-600">
                Ветеринари, кінологи, нутриціологи. Онлайн-консультації під ваш запит.
              </p>
            </div>

            {/* Поиск */}
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Пошук: ім'я, напрям, місто…"
                className="rounded-xl border px-4 py-2 w-64"
                style={{ borderColor: `${colors.primary}22` }}
              />
            </div>
          </div>

          {/* Фильтры-домены */}
          <div className="mt-4 flex flex-wrap gap-2">
            {domains.map((d) => {
              const activeChip = d === active;
              return (
                <button
                  key={d}
                  onClick={() => setActive(d)}
                  className={`text-sm rounded-full px-3 py-1 border transition ${
                    activeChip ? "shadow-sm" : "hover:shadow"
                  }`}
                  style={{
                    borderColor: `${colors.primary}22`,
                    background: activeChip ? `${colors.primary}10` : "#fff",
                    color: activeChip ? colors.primary : colors.text,
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </section>

        {/* Сетка карточек */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, idx) => (
            <article
              key={idx}
              className="group rounded-2xl border bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: `${colors.primary}22` }}
            >
              {/* верх блока с фоном/градиентом */}
              <div
                className="p-5"
                style={{
                  background: `radial-gradient(180px 120px at 100% -20%, ${colors.accent}18, transparent 70%),
                               radial-gradient(180px 120px at -10% 120%, ${colors.primary}15, transparent 70%)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <Avatar name={p.name} src={p.photo} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg" style={{ color: colors.text }}>
                        {p.name}
                      </h3>
                      {/* рейтинг */}
                      <div className="flex items-center gap-0.5 text-amber-500 text-sm" aria-label={`Рейтинг ${p.rating}/5`}>
                        {"★".repeat(p.rating)}
                        {"☆".repeat(5 - p.rating)}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-600 truncate">{p.role}</div>
                    <div className="text-xs text-zinc-500 mt-1">{p.city}</div>
                  </div>
                </div>
              </div>

              {/* теги/компетенции */}
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border"
                      style={{
                        borderColor: `${colors.accent}44`,
                        background: `${colors.accent}10`,
                        color: colors.accent,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA на карточке */}
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href="/#book"
                    className="text-sm font-medium"
                    style={{ color: colors.accent }}
                  >
                    Записатися →
                  </a>
                  <a
                    href="/#how"
                    className="text-sm text-zinc-600 hover:opacity-80"
                    aria-label="Як це працює"
                  >
                    Детальніше
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* если ничего не найдено */}
        {filtered.length === 0 && (
          <div className="text-center text-zinc-600 mt-10">
            Нічого не знайдено. Спробуйте інші фільтри або пошук.
          </div>
        )}
      </main>
    </div>
  );
}
