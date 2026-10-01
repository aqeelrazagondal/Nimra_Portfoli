import {defineConfig} from '@playwright/test';
// Locally the dev server is reused; in CI the production build is served (npm run build first).
const ci=!!process.env.CI;
export default defineConfig({
 testDir:'./tests',testMatch:'**/*.spec.ts',workers:1,
 use:{baseURL:'http://127.0.0.1:3000',headless:true,
  // Optional: point at a preinstalled Chromium instead of Playwright's download.
  ...(process.env.CHROMIUM_PATH?{launchOptions:{executablePath:process.env.CHROMIUM_PATH}}:{})},
 webServer:{command:ci?'npm run start':'npm run dev',url:'http://127.0.0.1:3000/',reuseExistingServer:!ci,timeout:180_000},
});
