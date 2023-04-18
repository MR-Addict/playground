# Next.js Playground [![Website](https://cronitor.io/badges/lpgpAc/production/psXmQTVKv7rYLXnKsHcevoF8H6c.svg)](https://playground.cronitorstatus.com/)

## 1. Packages

- [x] Zod
- [x] Sass
- [x] Sharp
- [x] Sanity
- [x] Nextauth
- [x] Typescript
- [ ] Turbopack
- [x] Codemirror
- [x] Nodemailer
- [x] Tailwindcss
- [x] Gray Matter
- [x] React Icons
- [x] Mongodb Altas
- [x] Framer Motion
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
- [x] Cronitor
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
- [x] Login user group
- [x] Online HTMl playground
- [x] Capture website from url
- [x] Playground(Hidden interactive eggs)

## 4. Bugs

- [x] Cannot use bcrypt(Replaced by bcryptjs, only used on server side)
- [x] Only root `loading.tsx` usable(Seems that the bug has been fixed after 13.1.6)
- [x] Cannot generate static pages using force-cache(Solved because of Nextauth unstabl_getServerSession at root navbar)

## 5. Traps

- [x] Server side cannot access client-side api route
- [x] Client side cannot access server-side environment(env in next config accessible globally)
- [x] `dns not found` error mostly you put server component in client component. They even cannot be in the same `index.ts`.

## 6. TODOs

- [x] Add page loading progress bar(2023.4.1 Tricky way to solve it)
- [ ] Better way to update user session whenever a user first opens page
- [x] Gist page add add and delete button(2023.4.12 Solved by using sanity studio)

## 7. Tailwindcss Rules

| Key         | Value     |
| :---------- | :-------- |
| Max width   | sm        |
| Break point | md        |
| Duration    | 300       |
| Light       | gray-500  |
| Dark        | gray-700  |
| Theme       | green-600 |

## 8. Deploy

Add `.env` file:

```env
MAILFROM="your_email"
MAILPASS="your_email_pass"
OPENAI_TOKEN="create_a_openai_token"
GITHUB_TOKEN="create_a_github_token"
CRONITOR_TOKEN="create_a_cronitor_token"
NEXTAUTH_SECRET="create_a_nextauth_secret"
SANITY_PROJECT_ID="create_a_sanity_project_id"
NEXTAUTH_URL="https://your.website.domain.com/"
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

Build project:

```bash
npm run build
```

Start project:

```bash
npm start
```

## 9. Available links

- [https://mraddict.one](https://mraddict.one)
- [https://playground.mraddict.vercel.app](https://playground.mraddict.vercel.app)

> Powered by [vercel](https://vercel.com) and [mongodb](https://www.mongodb.com/atlas/database).
