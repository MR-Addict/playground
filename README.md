# Next.js Playground ![Website](https://cronitor.io/badges/lpgpAc/production/psXmQTVKv7rYLXnKsHcevoF8H6c.svg)

## 1. Packages

- [x] Nextauth
- [x] Typescript
- [ ] Turbopack
- [x] Codemirror
- [x] Nodemailer
- [x] Tailwindcss
- [x] Gray Matter
- [x] Mongodb Altas
- [x] Next MDX Remote
- [x] Bcrypt(Replaced by bcryptjs, only used on server side)

## 2. Components

- [x] Popup
- [x] Error
- [x] Footer
- [x] Loading
- [x] Tooltip
- [x] Youtube
- [x] Codepen
- [x] Markdown
- [x] ScrollToTop

## 3. Features

- [x] `src` folder
- [x] Blog
- [x] Login
- [x] Tools
- [x] Mongodb
- [x] Feedback
- [x] Add Moments
- [x] Live timeago
- [x] Online HTMl playground
- [x] Capture website from url
- [x] Playground(Hidden interactive eggs)

## 4. Bugs

- [x] Cannot use bcrypt(Replaced by bcryptjs, only used on server side)
- [x] Only root `loading.tsx` usable(Seems that the bug has been fixed after 13.1.6)
- [x] Cannot generate static pages using force-cache(Solved because of Nextauth unstabl_getServerSession at root navbar)

## 5. Traps

- [x] Server side cannot access client side api route
- [x] Client side cannot access server side environment(env in next config accessable globally)
- [x] `dns not found` error mostly you put server in client component. They even cannot be in the same `index.ts`.

## 6. Tailwindcss Rules

| Key      | Value     |
| :------- | :-------- |
| Duration | 300       |
| Light    | gray-500  |
| Dark     | gray-700  |
| Theme    | green-600 |

## 7. Deploy

add `.env` file:

```env
MAILFROM="your_email"
MAILPASS="your_email_pass"
GITHUB_TOKEN="create_a_github_token"
CRONITOR_TOKEN="create_a_cronitor_token"
NEXTAUTH_SECRET="create_a_nextauth_secret"
NEXTAUTH_URL="https://your.website.domain.com/"
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

build project:

```bash
npm run build
```

start project:

```bash
npm start
```

## 8. Links

Avaliable links:

- [https://mraddict.one](https://mraddict.one)
- [https://playground.mraddict.vercel.app](https://playground.mraddict.vercel.app)

> Powered by [vercel](https://vercel.com) and [mongodb](https://www.mongodb.com/atlas/database).
