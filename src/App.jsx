import React, { useState } from 'react';

import {
  HeartPulse,
  PawPrint,
  CalendarRange,
  MessageSquare,
  ShieldCheck,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Globe2,
  Users,
  Stethoscope,
  Cat,
  Dog,
  ChevronRight,
} from 'lucide-react';

// Брендова палітра
const colors = {
  primary: '#4B1C58', // темно‑фіолетовий
  accent: '#8C1D2E', // темно‑червоний
  light: '#F6F5F8',
  dark: '#0F0A12',
  text: '#1E1A22',
};

const Section = ({ id, children, className = '' }) => (
  <section
    id={id}
    className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
  >
    {children}
  </section>
);

const Badge = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border"
    style={{
      color: colors.primary,
      borderColor: `${colors.primary}30`,
      background: `${colors.primary}0D`,
    }}
  >
    {children}
  </span>
);

const PillButton = ({ children, href = '#', variant = 'primary' }) => {
  const styles =
    variant === 'primary'
      ? {
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
          color: 'white',
        }
      : {
          background: colors.light,
          color: colors.text,
          border: `1px solid ${colors.primary}22`,
        };
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-sm hover:shadow transition-all"
      style={styles}
    >
      {children}
    </a>
  );
};

const FeatureCard = ({ icon: Icon, title, text }) => (
  <div className="group">
    <div
      className="h-full rounded-2xl p-6 border backdrop-blur-sm transition-all hover:-translate-y-0.5"
      style={{
        borderColor: `${colors.primary}22`,
        background: `linear-gradient(180deg, ${colors.light}CC, #FFFFFF 60%)`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="rounded-xl p-2"
          style={{ background: `${colors.primary}10`, color: colors.primary }}
        >
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
          {title}
        </h3>
      </div>
      <p className="text-sm leading-6" style={{ color: '#3b3340' }}>
        {text}
      </p>
    </div>
  </div>
);

const Step = ({ number, title, text }) => (
  <div
    className="relative rounded-2xl p-6 border bg-white"
    style={{ borderColor: `${colors.primary}22` }}
  >
    <div
      className="absolute -top-4 left-6 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: `${colors.accent}15`, color: colors.accent }}
    >
      Крок {number}
    </div>
    <h4 className="text-base font-semibold mb-2" style={{ color: colors.text }}>
      {title}
    </h4>
    <p className="text-sm leading-6 text-zinc-700">{text}</p>
  </div>
);

const FaqItem = ({ q, a }) => (
  <details
    className="group rounded-2xl border p-5 transition-all bg-white"
    style={{ borderColor: `${colors.primary}22` }}
  >
    <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
      <span className="font-medium" style={{ color: colors.text }}>
        {q}
      </span>
      <ChevronRight className="opacity-70" />
    </summary>
    <p className="mt-3 text-sm leading-6 text-zinc-700">{a}</p>
  </details>
);

export default function App() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message: msg }),
      });
      const data = await r.json();
      if (data.ok) {
        setStatus('ok');
        setName('');
        setContact('');
        setMsg('');
      } else setStatus('err');
    } catch {
      setStatus('err');
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(1200px 600px at 100% -10%, ${colors.accent}10 0%, transparent 60%),
                   radial-gradient(1000px 500px at -10% 0%, ${colors.primary}10 0%, transparent 60%), #faf9fb`,
      }}
    >
      {/* Навбар */}
      <header
        className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b"
        style={{ borderColor: `${colors.primary}14` }}
      >
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 grid place-items-center rounded-xl font-bold"
              style={{ background: colors.primary, color: 'white' }}
            >
              PB
            </div>
            <div className="leading-tight">
              <div className="font-semibold" style={{ color: colors.text }}>
                Pet Balance
              </div>
              <div className="text-xs text-zinc-500">
                Баланс здоров’я, поведінки і життя тварин
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:opacity-80">
              Як це працює
            </a>
            <a href="#experts" className="hover:opacity-80">
              Експерти
            </a>
            <a href="#prices" className="hover:opacity-80">
              Тарифи
            </a>
            <a href="#faq" className="hover:opacity-80">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <PillButton href="#book" variant="primary">
              Записатися <ArrowRight size={18} />
            </PillButton>
          </div>
        </Section>
      </header>

      {/* Герой */}
      <Section className="pt-14 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge>
              <PawPrint size={14} /> Онлайн‑платформа консультацій
            </Badge>
            <h1
              className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight"
              style={{ color: colors.text }}
            >
              Допомагаємо власникам тварин приймати{' '}
              <span style={{ color: colors.accent }}>правильні рішення</span>
            </h1>
            <p className="mt-4 text-zinc-700 text-base leading-7 max-w-xl">
              Консультації від ветеринарів, зоопсихологів, каністерапевтів і
              кінологів. Онлайн, швидко, з турботою.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PillButton href="#book" variant="primary">
                Підібрати спеціаліста <ArrowRight size={18} />
              </PillButton>
              <PillButton href="#how" variant="secondary">
                Як це працює
              </PillButton>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} /> Захист даних
              </span>
              <span className="inline-flex items-center gap-2">
                <Star size={16} /> Якісний підхід
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarRange size={16} /> Гнучкий запис
              </span>
            </div>
          </div>

          {/* Візуал */}
          <div className="relative">
            <div
              className="aspect-[4/3] rounded-3xl border overflow-hidden shadow-sm"
              style={{
                borderColor: `${colors.primary}22`,
                background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
              }}
            >
              <div className="absolute inset-0 p-6 grid grid-rows-6 grid-cols-6 gap-3">
                {/* Карточки‑плитки */}
                <div
                  className="col-span-3 row-span-3 rounded-2xl bg-white/80 backdrop-blur p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${colors.accent}15`,
                        color: colors.accent,
                      }}
                    >
                      <Stethoscope size={18} />
                    </div>
                    <div className="font-semibold">Ветеринар онлайн</div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600">
                    Пояснимо аналізи, протоколи, дієту.
                  </p>
                </div>
                <div
                  className="col-span-3 row-span-2 rounded-2xl bg-white/80 backdrop-blur p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      <Users size={18} />
                    </div>
                    <div className="font-semibold">Зоопсихолог</div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600">
                    Поводження, тривога, звички — з любов’ю.
                  </p>
                </div>
                <div
                  className="col-span-2 row-span-3 rounded-2xl bg-white/80 backdrop-blur p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${colors.primary}15`,
                        color: colors.primary,
                      }}
                    >
                      <Dog size={18} />
                    </div>
                    <div className="font-semibold">Кінолог</div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600">
                    Базова слухняність і безпека прогулянок.
                  </p>
                </div>
                <div
                  className="col-span-2 row-span-3 rounded-2xl bg-white/80 backdrop-blur p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${colors.accent}15`,
                        color: colors.accent,
                      }}
                    >
                      <Cat size={18} />
                    </div>
                    <div className="font-semibold">Нутриціолог</div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600">
                    Індивідуальні раціони й корекція ваги.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Переваги */}
      <Section className="py-8" id="benefits">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={HeartPulse}
            title="Комплексний підхід"
            text="Здоров’я, поведінка й спосіб життя — в одному місці."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Швидкий зв’язок"
            text="Чат, відео або голос — як вам зручно."
          />
          <FeatureCard
            icon={CalendarRange}
            title="Зручний запис"
            text="Гнучкий графік і нагадування про консультації."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Надійність"
            text="Безпечне зберігання даних та етичні протоколи."
          />
        </div>
      </Section>

      {/* Як це працює */}
      <Section className="py-14" id="how">
        <div className="max-w-3xl">
          <Badge>Просто і прозоро</Badge>
          <h2
            className="mt-3 text-3xl font-bold"
            style={{ color: colors.text }}
          >
            Як це працює
          </h2>
          <p className="mt-3 text-zinc-700">Кілька кроків — і ви з фахівцем.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Step
            number={1}
            title="Опишіть запит"
            text="Коротко розкажіть про вашу тварину та проблему."
          />
          <Step
            number={2}
            title="Обирайте спеціаліста"
            text="Ми запропонуємо профілі та вартість. Ви обираєте формат консультації."
          />
          <Step
            number={3}
            title="Отримайте план"
            text="Покрокові рекомендації та супровід до результату."
          />
        </div>
      </Section>

      {/* Експерти */}
      <Section className="py-12" id="experts">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Badge>Команда</Badge>
            <h2
              className="mt-3 text-3xl font-bold"
              style={{ color: colors.text }}
            >
              Наші спеціалісти
            </h2>
            <p className="mt-2 text-zinc-700 max-w-2xl">
              Ветеринари, зоопсихологи, кінологи, нутриціологи — з практичним
              досвідом в Україні та ЄС.
            </p>
          </div>
          <a
            href="#book"
            className="text-sm font-medium hover:opacity-80"
            style={{ color: colors.accent }}
          >
            Дивитися всіх →
          </a>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Марія',
              role: 'Лікар‑стаціонар',
              tags: ['Терапія', 'Аналізи', '24/7'],
            },
            {
              name: 'Олександр',
              role: 'Кінолог',
              tags: ['Безпека', 'Слухняність'],
            },
            {
              name: 'Євгенія',
              role: 'Дерматологія',
              tags: ['Шкіра', 'Алергії', 'Лабораторія'],
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border p-5 bg-white/90 backdrop-blur"
              style={{ borderColor: `${colors.primary}22` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>
                    {p.name}
                  </div>
                  <div className="text-sm text-zinc-600">{p.role}</div>
                </div>
                <div
                  className="rounded-xl px-3 py-1 text-xs"
                  style={{
                    background: `${colors.primary}10`,
                    color: colors.primary,
                  }}
                >
                  Онлайн
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${colors.accent}10`,
                      color: colors.accent,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ціни / CTA */}
      <Section className="py-14" id="prices">
        <div
          className="rounded-3xl p-6 md:p-10 border overflow-hidden"
          style={{
            borderColor: `${colors.primary}22`,
            background: `linear-gradient(135deg, #fff, ${colors.light})`,
          }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge>Прозорі тарифи</Badge>
              <h3
                className="mt-3 text-2xl font-bold"
                style={{ color: colors.text }}
              >
                Платіть лише за корисні консультації
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5"
                    size={18}
                    style={{ color: colors.primary }}
                  />{' '}
                  Швидка текстова консультація — <b>від 199₴</b>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5"
                    size={18}
                    style={{ color: colors.primary }}
                  />{' '}
                  Відеозв’язок 25 хв — <b>від 449₴</b>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5"
                    size={18}
                    style={{ color: colors.primary }}
                  />{' '}
                  Супровід 7 днів у чаті — <b>від 699₴</b>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-3">
                <PillButton href="#book" variant="primary">
                  Записатися зараз <ArrowRight size={18} />
                </PillButton>
                <PillButton href="#faq" variant="secondary">
                  Питання та відповіді
                </PillButton>
              </div>
            </div>
            <div
              className="rounded-2xl border p-6 bg-white"
              style={{ borderColor: `${colors.primary}22` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background: `${colors.primary}15`,
                    color: colors.primary,
                  }}
                >
                  <Globe2 size={20} />
                </div>
                <div className="font-semibold" style={{ color: colors.text }}>
                  Працюємо в Україні та ЄС
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-700">
                Оплата карткою, Apple/Google Pay. Повернення згідно політики
                сервісу.
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <div
                  className="rounded-xl p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="font-semibold">Для власників</div>
                  <p className="text-zinc-600 mt-1">
                    Швидкі відповіді й план дій.
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ borderColor: `${colors.primary}22` }}
                >
                  <div className="font-semibold">Для фахівців</div>
                  <p className="text-zinc-600 mt-1">
                    Підключайтеся як експерт Pet Balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Відгуки */}
      <Section className="py-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Badge>Довіра</Badge>
            <h2
              className="mt-3 text-3xl font-bold"
              style={{ color: colors.text }}
            >
              Відгуки клієнтів
            </h2>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            'Швидко й по суті. Допомогли з дієтою для мопса.',
            'Кінолог дав чіткі кроки без зайвої теорії.',
            'Зоопсихолог пояснила причини тривоги — маємо прогрес!',
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border bg-white"
              style={{ borderColor: `${colors.primary}22` }}
            >
              <div className="flex items-center gap-2 mb-2 text-amber-500">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
              <p className="text-sm text-zinc-700">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-12" id="faq">
        <div className="max-w-3xl">
          <Badge>Питання</Badge>
          <h2
            className="mt-3 text-3xl font-bold"
            style={{ color: colors.text }}
          >
            Часті запитання
          </h2>
          <div className="mt-6 grid gap-3">
            <FaqItem
              q="Що таке Pet Balance?"
              a="Онлайн‑сервіс, де власники отримують консультації від профільних фахівців: ветеринарів, зоопсихологів, кінологів, нутриціологів."
            />
            <FaqItem
              q="Це замінює візит до клініки?"
              a="Ні. Ми даємо попередні рекомендації, допомагаємо зорієнтуватись та підготуватись до офлайн‑візиту, якщо він необхідний."
            />
            <FaqItem
              q="Які способи оплати?"
              a="Банківські картки, Apple/Google Pay. Вартість залежить від формату та спеціаліста."
            />
            <FaqItem
              q="Чи зберігаються дані тварини?"
              a="Так, дані захищені та використовуються лише для якісної консультації."
            />
          </div>
        </div>
      </Section>

      {/* Контакти */}
      <Section className="py-12" id="book">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Badge>Звʼязатися</Badge>
            <h2
              className="mt-3 text-3xl font-bold"
              style={{ color: colors.text }}
            >
              Записатися на консультацію
            </h2>
            <p className="mt-2 text-zinc-700">
              Залиште контакти — ми підберемо спеціаліста під ваш запит.
            </p>

            <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше імʼя"
                className="rounded-xl border px-4 py-3 outline-none focus:ring-2"
                style={{ borderColor: `${colors.primary}22` }}
              />
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email або телефон"
                className="rounded-xl border px-4 py-3 outline-none focus:ring-2"
                style={{ borderColor: `${colors.primary}22` }}
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Коротко опишіть запит"
                rows={4}
                className="rounded-xl border px-4 py-3 outline-none focus:ring-2"
                style={{ borderColor: `${colors.primary}22` }}
              />
              <button
                disabled={status === 'loading'}
                type="submit"
                className="rounded-2xl px-5 py-3 font-medium inline-flex items-center gap-2 shadow-sm hover:shadow transition-all"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                  color: 'white',
                }}
              >
                {status === 'loading' ? (
                  'Надсилаємо…'
                ) : (
                  <>
                    Надіслати запит <ArrowRight size={18} />
                  </>
                )}
              </button>

              {status === 'ok' && (
                <div className="text-green-600 text-sm">
                  Дякуємо! Ми зв’яжемося з вами найближчим часом.
                </div>
              )}
              {status === 'err' && (
                <div className="text-red-600 text-sm">
                  Сталася помилка. Спробуйте ще раз або напишіть нам напряму.
                </div>
              )}
            </form>
          </div>

          <div
            className="rounded-2xl border p-6 bg-white"
            style={{ borderColor: `${colors.primary}22` }}
          >
            <div className="grid gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={18} className="opacity-70" />
                <span>+380 ••• •• ••</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="opacity-70" />
                <span>petbalance.ua@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="opacity-70" />
                <span>Україна / Чехія — онлайн</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="opacity-70" />
                <span>Конфіденційність та безпека даних</span>
              </div>
            </div>
            <div
              className="mt-6 rounded-xl p-4"
              style={{ background: `${colors.primary}08` }}
            >
              <div className="text-xs text-zінc-600">
                Натискаючи «Надіслати запит», ви погоджуєтесь з умовами сервісу.
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Футер */}
      <footer
        className="mt-10 border-t"
        style={{ borderColor: `${colors.primary}14` }}
      >
        <Section className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <PawPrint size={16} className="opacity-70" />
            <span>© {new Date().getFullYear()} Pet Balance</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:opacity-80">
              Політика конфіденційності
            </a>
            <a href="#" className="hover:opacity-80">
              Публічний договір
            </a>
          </div>
        </Section>
      </footer>
    </div>
  );
}
