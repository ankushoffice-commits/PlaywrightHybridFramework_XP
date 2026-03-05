import { Page, expect } from '@playwright/test';
import { Environment } from '../utils/Environment';

export class MainPage {
  private page: Page;
  private readonly url = Environment.getAppUrl();

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle'); // Additional wait for dynamic content
  }

  async isLoggedIn() {
    return this.page.getByText('Hello, world!').isVisible();
  }

  async openMenu() {
    await this.page.locator('body').click(); // Close any open panels
    // Try multiple selectors for the menu button
    const menuButton = this.page.locator('[aria-label="Hide or show side menu"], [title="Hide or show side menu"], .menu-button, [role="button"]:has-text("Menu")').first();
    await menuButton.click();
  }

  async navigateToMasters() {
    await this.page.getByText('📄 Masters ›').waitFor();
    await this.page.getByText('📄 Masters ›').click();
  }

  async navigateToCompany() {
    await this.page.getByText('Company').waitFor();
    await this.page.getByText('Company').click();
    await expect(this.page).toHaveURL(/CompanyTrial/);
  }

  async isCompanyPageLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Company Trial Management' })).toBeVisible();
    await expect(this.page.getByRole('group', { name: 'Companies List' })).toBeVisible();
  }
}