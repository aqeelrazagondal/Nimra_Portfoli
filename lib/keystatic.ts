// Missing credentials must not prevent public static builds before initial setup.
export const keystaticEnabled=process.env.NODE_ENV==='development'||!!(process.env.KEYSTATIC_GITHUB_CLIENT_ID&&process.env.KEYSTATIC_GITHUB_CLIENT_SECRET&&process.env.KEYSTATIC_SECRET&&process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);
