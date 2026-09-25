import type {NextConfig} from 'next';

// Content-Security-Policy without nonces (Next.js "Without Nonces" guide), so pages stay static and
// CDN-cached. 'unsafe-inline' scripts cover the theme script and the Next.js runtime; the only third
// parties are Cloudflare Turnstile (contact form) and YouTube's no-cookie player (article embeds).
const dev=process.env.NODE_ENV==='development';
// Preview deployments load Vercel's toolbar and comments from vercel.live.
const live=process.env.VERCEL_ENV==='preview'?' https://vercel.live':'';
const csp=[
 "default-src 'self'",
 `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${live}${dev?" 'unsafe-eval'":''}`,
 "style-src 'self' 'unsafe-inline'",
 "img-src 'self' data: blob:",
 "font-src 'self'",
 `connect-src 'self' https://challenges.cloudflare.com${live}`,
 `frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com${live}`,
 "frame-ancestors 'none'",
 "form-action 'self'",
 "base-uri 'self'",
 "object-src 'none'",
 ...(dev?[]:['upgrade-insecure-requests']),
].join('; ');
const security=[
 {key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains'},
 {key:'X-Frame-Options',value:'DENY'},
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), browsing-topics=()'},
];

const nextConfig:NextConfig={
 // "Last updated" on the footer, CV and PDF follows the deploy date.
 env:{NEXT_PUBLIC_BUILD_DATE:new Date().toISOString().slice(0,10)},
 // Articles and profile photos are read from the repo at render time (hourly revalidation), so ship them with every route.
 outputFileTracingIncludes:{'/**':['./content/articles/**/*','./content/profile/**/*']},
 async headers(){return [
  {source:'/:path*',headers:security},
  // The Keystatic admin talks to its own services, so it is left out of the CSP.
  {source:'/((?!keystatic|api/keystatic).*)',headers:[{key:'Content-Security-Policy',value:csp}]},
 ]},
};
export default nextConfig;
