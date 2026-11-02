# AlphaLux

Сайт компанії **AlphaLux** (внутрішнє оздоблення та реновація). Багатомовний лендінг з окремими сторінками послуг, проєктів і «про нас».

## Стек

| Шар | Технологія |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | [React](https://react.dev/) 19 |
| Мова | [TypeScript](https://www.typescriptlang.org/) 5 (strict) |
| Стилі | [Tailwind CSS](https://tailwindcss.com/) 4 + PostCSS (`@tailwindcss/postcss`) |
| Шрифти | [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Manrope, Cormorant Garamond |
| Зображення | [next/image](https://nextjs.org/docs/app/api-reference/components/image) |
| Лінгтер | ESLint 9 + `eslint-config-next` (Core Web Vitals) |
| Деплой | [Vercel](https://vercel.com/) |

Залежностей окрім Next/React немає: без UI-kits, CMS і бекенд-SDK.

## Як влаштовано

- **App Router** — маршрути в `app/[lang]/…`, дефолтна мова німецька (`de`).
- **i18n** — словники `dictionaries/{de,en,uk}.ts`. Редірект і cookie `NEXT_LOCALE` у `proxy.ts` (Next.js 16 proxy замість middleware).
- **Turbopack** — dev-сервер Next.js 16.
- **Route Handler** — `POST /api/contact` приймає заявку з форми.
- **Медіа** — локальні фото й відео в `public/photos` і `public/videos`; частина галереї ще через Unsplash.

Сторінки: `/[lang]`, `/[lang]/services`, `/[lang]/projects`, `/[lang]/about`.

## Локально

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) — редірект на `/de`.

## Vercel

1. Репозиторій уже на GitHub: [INichiporenko/Alpha-Lux](https://github.com/INichiporenko/Alpha-Lux).
2. У [vercel.com](https://vercel.com) — **Add New → Project**, оберіть репозиторій.
3. Framework Preset: **Next.js**. Команди за замовчуванням не змінювати.
4. Deploy.

### Kontaktformular (E-Mail)

Anfragen gehen an **info@alphalux-innenausbau.de** über [Resend](https://resend.com).

1. Konto auf [resend.com](https://resend.com) anlegen und API-Key kopieren.
2. Lokal: Datei `.env.local` anlegen:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO=info@alphalux-innenausbau.de
CONTACT_FROM="Alphalux <info@alphalux-innenausbau.de>"
```

3. Auf Vercel dieselben Variablen unter **Project → Settings → Environment Variables** setzen und neu deployen.
4. Domain `alphalux-innenausbau.de` in Resend ist verifiziert; `CONTACT_FROM` verwendet `info@alphalux-innenausbau.de`.
