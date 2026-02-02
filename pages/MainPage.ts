import { Page, expect } from '@playwright/test';

export class MainPage {
  private page: Page;
  private readonly url = 'https://coremasters.algorithms.com/';

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
    await this.page.getByRole('button', { name: 'Menu' }).click();
  }

  async navigateToMasters() {
    await this.page.getByText('📄 Masters ›').waitFor();
    await this.page.getByText('📄 Masters ›').click();
  }

  async navigateToCompany() {
    await this.page.getByRole('link', { name: 'Company' }).waitFor();
    await this.page.getByRole('link', { name: 'Company' }).click();
    await expect(this.page).toHaveURL(/CompanyTrial/);
  }

  async isCompanyPageLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Company Trial Management' })).toBeVisible();
    await expect(this.page.getByRole('group', { name: 'Companies List' })).toBeVisible();
  }
}