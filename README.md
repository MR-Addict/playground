# Personal Nextjs Playground

## 1. Custom Packages

- [x] Prettier
- [x] Nextauth
- [x] Typescript
- [ ] Turbopack
- [x] Tailwindcss
- [x] Mongodb Altas
- [x] Bcryptjs(Replacing bcrypt used on Server Side)

## 2. Custom Components

- [x] Popup
- [x] Error
- [x] Footer
- [x] Loading
- [x] Tooltip
- [x] ScrollToTop

## 3. Features

- [x] `src` folder
- [x] Login
- [x] Mongodb

## 4. Tailwindcss Rules

| Key        | Value     |
| :--------- | :-------- |
| Theme      | green-600 |
| Radius     | sm        |
| Dark       | gray-900  |
| Dark Light | gray-700  |
| Duration   | 300       |

## 5. How to Deploy

add `.env` file:

```env
NEXTAUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://your.domain.com/"
MONGODB_URI="mongodb://username:password@mongodb0.example.com:27017/"
```

Creat Next.js app with custom template:

```bash
npx create-next-app@latest -e https://github.com/MR-Addict/nextjs-template
```
