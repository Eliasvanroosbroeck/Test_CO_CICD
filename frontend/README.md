# Getting started with the front-end

## Create a Next.js app

First, you need to create a Next.js app in this directory. In a terminal, execute:

```console
> npx create-next-app@latest --typescript
```

Since you will be running the back-end on port `3000`, you will need to change the default port for the front-end development server. Open `package.json`and change the scripts so that the server will be started on port `8000`:

```json
"scripts": {
    "dev": "next dev -p 8000",
    "build": "next build",
    "start": "next start -p 8000",
    "lint": "next lint"
  },
```

Start the development server by opening a terminal in the `frontend` folder and running:

```console
> npm run dev

```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

You can start by modifying `pages/index.tsx` and develop React components. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js and React, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [React Documentation](https://reactjs.org/docs/getting-started.html)













-------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

