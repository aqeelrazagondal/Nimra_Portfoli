// The editor runs locally in development and through Keystatic Cloud in production.
// Anywhere else (e.g. a production build with no Cloud project) it is switched off.
export const keystaticEnabled=process.env.NODE_ENV==='development'||!!process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;
