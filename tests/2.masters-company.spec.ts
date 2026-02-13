import { test, expect } from '../utils/BaseTest';
import { SessionManager } from '../utils/SessionManager';
import { TestDataLoader } from '../utils/TestDataLoader';
import { MainPage } from '../pages/MainPage';

const testData = TestDataLoader.loadData<{
  validLogin: { email: string; password: string; expected: string };
}>('login.json');

// Test to login and save session
test('login and save session', async ({ browser }) => {
  const context = await SessionManager.createAuthenticatedSession(
    browser,
    testData.validLogin.email,
    testData.validLogin.password
  );
  await context.close();
});

// Test to use saved session and navigate to Masters > Company
test('navigate to masters company using saved session', async ({ browser }) => {
  const context = await SessionManager.loadAuthenticatedSession(browser);
  const page = await context.newPage();
  const mainPage = new MainPage(page);

  await mainPage.goto();
  await mainPage.waitForPageLoad();

  // Verify we're logged in
  expect(await mainPage.isLoggedIn()).toBe(true);

  // Navigate to Company page
  await mainPage.openMenu();
  await mainPage.navigateToMasters();
  await mainPage.navigateToCompany();

  // Verify company page
  await mainPage.isCompanyPageLoaded();

  await context.close();
});