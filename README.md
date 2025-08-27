# Pet Balance — Landing

Готовий до деплою проект (Vite + React + Tailwind).

## Локальний запуск
```bash
npm i
npm run dev
```
Відкрийте http://localhost:5173/

## Білд
```bash
npm run build
npm run preview
```

## Деплой на Vercel (рекомендовано)
1. Створіть репозиторій на GitHub і завантажте туди файли цього проекту.
2. Зайдіть на https://vercel.com → Add New Project → Import з GitHub.
3. Framework preset: **Vite**, Build command: `npm run build`, Output dir: `dist/` (за замовчуванням).
4. Deploy — отримаєте публічну URL.

## Деплой на Netlify
1. Netlify → Add new site → Import an existing project з GitHub.
2. Build command: `npm run build`, Publish directory: `dist`.
3. Deploy.

## GitHub Pages (якщо без серверної частини)
1. Встановіть пакет gh-pages: `npm i -D gh-pages` і додайте в `package.json` скрипти:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
2. `npm run deploy` — проєкт опублікується на `<користувач>.github.io/<repo>/`.
