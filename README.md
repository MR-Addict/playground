# Personal Nextjs Playground

## 1. Custom Packages

- [x] Prettier
- [x] Nextauth
- [x] Typescript
- [ ] Turbopack
- [x] Tailwindcss
- [x] Mongodb Altas
- [x] Bcryptjs(Replaced with bcrypt, only used on server side)

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

## 4. Bugs

- [x] Cannot use bcrypt(Replaced with bcrypt, only used on server side)
- [x] Cannot generate static pages using force-cache(Solved because of Nextauth unstabl_getServerSession at root navbar)

## 5. Tailwindcss Rules

| Key      | Value     |
| :------- | :-------- |
| Radius   | sm        |
| Duration | 300       |
| Theme    | green-600 |
| Dark     | gray-700  |
| Light    | gray-500  |

## 6. How to Deploy

add `.env` file:

```env
NEXTAUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://your.domain.com/"
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
