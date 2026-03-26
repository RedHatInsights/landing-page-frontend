import { chromium, type FullConfig } from '@playwright/test';
import { login } from './helpers/auth';

export default async function globalSetup(config: FullConfig) {
  const project = config.projects[0];
  const storageStatePath =
    project.use.storageState?.toString() ?? 'playwright/.auth/user.json';

  const proxy = project.use.proxy as { server: string; bypass?: string } | undefined;

  const browser = await chromium.launch({
    proxy: proxy?.server ? proxy : undefined,
  });
  const context = await browser.newContext({
    baseURL: project.use.baseURL?.toString(),
    ignoreHTTPSErrors: Boolean(project.use.ignoreHTTPSErrors),
  });
  const page = await context.newPage();

  // Block all TrustArc consent tracking domains (consent.trustarc.com, consent-pref.trustarc.com, etc.)
  await page.route('**://*.trustarc.com/**', (route) => route.abort());

  await login(page);
  await context.storageState({ path: storageStatePath });

  await browser.close();
}


