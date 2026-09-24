import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 // Articles are read from the repo at render time (hourly revalidation), so ship them with every route.
 outputFileTracingIncludes:{'/**':['./content/articles/**/*']},
};
export default nextConfig;
