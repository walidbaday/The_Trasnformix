// Plain .mjs and `next build --webpack`: the Hostinger build host's glibc is too
// old for Next's native SWC, and neither Turbopack nor a TypeScript config works
// on the WASM fallback. See HOSTINGER_DEPLOY.md.

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    /* 90 keeps the small type in the القطاعات dashboard renders crisp. */
    qualities: [75, 90],
  },
};

export default nextConfig;
