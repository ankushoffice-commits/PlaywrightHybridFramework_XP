// spec: specs/masters-e2e.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../utils/BaseTest';
import { SessionManager } from '../utils/SessionManager';
import { TestDataLoader } from '../utils/TestDataLoader';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';

// Load test data
const loginData = TestDataLoader.loadData<{
  validLogin: { email: string; password: string; expected: string };
}>('login.json');

const mastersData = TestDataLoader.loadData<{
  mastersMenuItems: string[];
  specialCases: { exactMatch: string[] };
  expectedCount: number;
}>('masters-verification.json');

test.describe('Masters Tab E2E Suite', () => {
  test('Login and verify all Masters sub-contents are present', async ({ browser }) => {
    // Create authenticated session
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      loginData.validLogin.email,
      loginData.validLogin.password
    );
    
    const page = await context.newPage();
    const mainPage = new MainPage(page);

    try {
      // Navigate to main application and wait for load
      await mainPage.goto();
      await mainPage.waitForPageLoad();

      // Verify we're logged in
      expect(await mainPage.isLoggedIn()).toBe(true);

      // Navigate to Masters menu
      await mainPage.navigateToMasters();

      // Verify all Masters sub-contents are present
      for (const menuItem of mastersData.mastersMenuItems) {
        if (mastersData.specialCases.exactMatch.includes(menuItem)) {
          await expect(page.getByRole('link', { name: menuItem, exact: true })).toBeVisible();
        } else {
          await expect(page.getByRole('link', { name: menuItem })).toBeVisible();
        }
      }

      // Additional verification: check that we have the expected minimum items
      // Use a more specific locator for menu items under Masters
      const mastersLinksCount = await page.locator('a[href*="stepType=Master"], a[href*="stepType=RegisterGird"], a[href*="stepType=PivotGrid"]').count();
      expect(mastersLinksCount).toBeGreaterThanOrEqual(mastersData.expectedCount - 2); // Allow some tolerance
      
    } finally {
      await context.close();
    }
  });
});