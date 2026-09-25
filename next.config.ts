import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 // "Last updated" on the footer, CV and PDF follows the deploy date.
 env:{NEXT_PUBLIC_BUILD_DATE:new Date().toISOString().slice(0,10)},
 // Articles and profile photos are read from the repo at render time (hourly revalidation), so ship them with every route.
 outputFileTracingIncludes:{'/**':['./content/articles/**/*','./content/profile/**/*']},
};
export default nextConfig;
