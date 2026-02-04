import { Page } from '@playwright/test';
import { Environment } from '../utils/Environment';

export class LoginPage {
  private page: Page;
  private readonly url = Environment.getLoginUrl();

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async isLoginFormVisible() {
    await this.page.locator('h1').filter({ hasText: 'Log in' }).waitFor();
    return this.page.locator('h1').filter({ hasText: 'Log in' }).isVisible();
  }

  async getErrorMessages() {
    // Try different selectors for error messages
    const errorSelectors = [
      '.validation-summary-errors li',
      '.field-validation-error',
      '.text-danger',
      '[class*="error"]',
      '.alert-danger'
    ];

    for (const selector of errorSelectors) {
      const elements = this.page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        return await elements.allTextContents();
      }
    }

    // Fallback: look for any text that might be an error
    const bodyText = await this.page.locator('body').textContent();
    const errorPatterns = [
      /The Email field is required\./g,
      /The Password field is required\./g,
      /The Email field is not a valid e-mail address\./g,
      /Invalid login attempt\./g
    ];

    const errors: string[] = [];
    for (const pattern of errorPatterns) {
      const matches = bodyText?.match(pattern);
      if (matches) {
        errors.push(...matches);
      }
    }

    return errors;
  }
}