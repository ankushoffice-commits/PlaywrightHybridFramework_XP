import { test as baseTest, Page, BrowserContext } from '@playwright/test';
import { SessionManager } from './SessionManager';
import { TestDataLoader } from './TestDataLoader';
import { LoginPage } from '../pages/LoginPage';

interface LoginData {
  email: string;
  password: string;
  expected?: string;
}

interface LoginTestData {
  validLogin: LoginData;
  invalidLogins: LoginData[];
}

type TestFixtures = {
  authenticatedPage: Page;
  loginUser: (credentials?: LoginData) => Promise<Page>;
  loginData: LoginTestData;
};

export const test = baseTest.extend<TestFixtures>({
  // Load login test data fixture
  loginData: async ({}, use) => {
    const data = TestDataLoader.loadData<LoginTestData>('login.json');
    await use(data);
  },

  // Authenticated page fixture - automatically logs in with valid credentials
  authenticatedPage: async ({ browser, loginData }, use) => {
    let context: BrowserContext;
    let page: Page;

    try {
      // Try to load existing session first
      context = await SessionManager.loadAuthenticatedSession(browser);
      page = await context.newPage();
      
      // Test if session is still valid by navigating to the main app
      await page.goto('https://coremasters.algorithms.com/');
      
      // If we get redirected to login, session is invalid
      await page.waitForTimeout(2000);
      if (page.url().includes('Login')) {
        await context.close();
        throw new Error('Session expired');
      }
    } catch (error) {
      // Create new authenticated session
      context = await SessionManager.createAuthenticatedSession(
        browser,
        loginData.validLogin.email,
        loginData.validLogin.password
      );
      page = await context.newPage();
    }

    await use(page);
    await context.close();
  },

  // Dynamic login function fixture - allows login with any credentials
  loginUser: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];
    
    const loginFunction = async (credentials?: LoginData): Promise<Page> => {
      // Default to valid login credentials if none provided
      const loginData = credentials || TestDataLoader.loadData<LoginTestData>('login.json').validLogin;
      
      const context = await browser.newContext();
      contexts.push(context);
      const page = await context.newPage();
      
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(loginData.email, loginData.password);
      
      // Wait for login to complete
      await page.waitForTimeout(2000);
      
      return page;
    };

    await use(loginFunction);
    
    // Cleanup all contexts
    for (const context of contexts) {
      await context.close();
    }
  }
});

export { expect } from '@playwright/test';