# Deploying a Next.js 16 project on Hostinger

Hostinger builds the project on its own Node.js host. That host has a glibc version
that is too old for Next's native SWC binary, so Next falls back to the WASM compiler.
Turbopack cannot run on that fallback, and a TypeScript config file cannot be
transpiled by it either. The four changes below make the build succeed there.
They are copied from the `ta3wenyat` project, which deploys this way.

## 1. Use `next.config.mjs` (plain JavaScript, not TypeScript)

Delete `next.config.ts` and create `next.config.mjs`:

```js
// Plain .mjs (no TS transpile) and `next build --webpack`: the Hostinger build host's
// glibc is too old for Next's native SWC, and Turbopack can't run on the WASM fallback.
// Tailwind therefore goes through PostCSS, which both bundlers understand.

/** @type {import("next").NextConfig} */
const nextConfig = {
  // ...your options here (no `turbopack` block)
};

export default nextConfig;
```

## 2. Build with webpack

In `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build --webpack",
  "start": "next start"
}
```

## 3. Tailwind v4 through PostCSS, not Turbopack

```bash
pnpm remove @tailwindcss/turbopack
pnpm add -D tailwindcss @tailwindcss/postcss
```

Create `postcss.config.mjs`:

```js
const config = { plugins: { "@tailwindcss/postcss": {} } };

export default config;
```

`app/globals.css` keeps the normal import:

```css
@import "tailwindcss";
```

Remove any `turbopack.rules` entry for `*.css` from the Next config.

## 4. Commit `.env.production` with the public URL

`NEXT_PUBLIC_*` values are inlined at build time on Hostinger's machine, so the
production file must be in Git.

`.env.production`:

```
# Loaded by `next build` / `next start`. NEXT_PUBLIC_ values are inlined at
# build time, so this must be correct before building for deploy.
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`.env.development` (optional, for local runs):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

In `.gitignore`, keep secrets ignored but allow these two files:

```
.env*
!.env.development
!.env.production
```

Real secrets never go in these files. Put them in `.env*.local` locally and in the
Hostinger panel's environment variables for production.

## 5. Hostinger panel setup

1. Push the repo to GitHub.
2. In hPanel, create a **Node.js** website and connect the GitHub repository and branch.
3. Build command: `pnpm install && pnpm build` (or `npm ci && npm run build`).
4. Start command: `pnpm start` (or `npm start`).
5. Add any secret environment variables in the panel.
6. Deploy. Later pushes to the branch redeploy automatically.

## Checklist before pushing

- [ ] `next.config.mjs` exists, `next.config.ts` is gone
- [ ] `build` script is `next build --webpack`
- [ ] `@tailwindcss/postcss` installed, `@tailwindcss/turbopack` removed
- [ ] `postcss.config.mjs` exists
- [ ] `.env.production` committed with the real `NEXT_PUBLIC_SITE_URL`
- [ ] `pnpm build` passes locally
