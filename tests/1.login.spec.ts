import { test, expect } from '../utils/BaseTest';
import { TestDataLoader } from '../utils/TestDataLoader';
import { LoginPage } from '../pages/LoginPage';
import { Environment } from '../utils/Environment';

interface InvalidLoginScenario {
  description: string;
  email: string;
  password: string;
  expectedErrors: string[];
}

interface ValidLoginData {
  email: string;
  password: string;
  expected: string;
}

interface TestData {
  validLogin: ValidLoginData;
  invalidLogins: InvalidLoginScenario[];
}

const testData: TestData = TestDataLoader.loadData<TestData>('login-data.json');

test('should display login form elements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Check heading
  expect(await loginPage.isLoginFormVisible()).toBe(true);

  // Additional checks can be added to LoginPage if needed
});

test.describe('Invalid Login Scenarios', () => {
  testData.invalidLogins.forEach((scenario: InvalidLoginScenario) => {
    test(`should show error for ${scenario.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      // Fill fields and login
      await loginPage.login(scenario.email, scenario.password);

      // Check error messages
      const errors = await loginPage.getErrorMessages();
      for (const expectedError of scenario.expectedErrors) {
        expect(errors).toContain(expectedError);
      }
    });
  });
});

test('should attempt login for valid credentials format', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Fill with valid format credentials and login
  await loginPage.login(testData.validLogin.email, testData.validLogin.password);

  // Check the expected result
  if (testData.validLogin.expected === 'success') {
    // On successful login, should redirect to coremasters site
    await expect(page).toHaveURL(Environment.getAppUrl());
  } else {
    // For invalid, expect error message
    await expect(page.getByText(testData.validLogin.expected).first()).toBeVisible();
  }
});