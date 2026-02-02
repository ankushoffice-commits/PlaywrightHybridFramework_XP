import { Browser, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';

export class SessionManager {
  static async createAuthenticatedSession(browser: Browser, email: string, password: string): Promise<BrowserContext> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    const mainPage = new MainPage(page);
    await mainPage.waitForPageLoad();

    // Save session
    await context.storageState({ path: 'session.json' });

    return context;
  }

  static async loadAuthenticatedSession(browser: Browser): Promise<BrowserContext> {
    return browser.newContext({ storageState: 'session.json' });
  }
}