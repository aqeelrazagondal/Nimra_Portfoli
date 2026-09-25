import type {NextConfig} from 'next';
const nextConfig:NextConfig={
 async headers(){return ['/keystatic/:path*','/api/keystatic/:path*'].map(source=>({source,headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'}]}))},
 // Keep repository content available to server-side readers and image generation.
 outputFileTracingIncludes:{'/**':['./content/articles/**/*','./content/profile/**/*','./public/images/articles/**/*']},
};
export default nextConfig;
