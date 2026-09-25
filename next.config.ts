import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 // Articles and profile photos are read from the repo at render time (hourly revalidation), so ship them with every route.
 outputFileTracingIncludes:{'/**':['./content/articles/**/*','./content/profile/**/*']},
};
export default nextConfig;
