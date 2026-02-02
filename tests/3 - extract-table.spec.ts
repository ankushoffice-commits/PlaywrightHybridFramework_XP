import { test, expect } from '../utils/BaseTest';
import { SessionManager } from '../utils/SessionManager';
import { MainPage } from '../pages/MainPage';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

test('extract companies table data', async ({ browser }) => {
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

  // Extract table data - find table within the Companies List group
  const companiesList = page.getByRole('group', { name: 'Companies List' });
  const tableLocator = companiesList.locator('table');

  // Wait for table to be visible
  await tableLocator.waitFor();

  const tableData = await tableLocator.locator('tbody tr').evaluateAll(rows => {
    return rows.map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(cell => cell.textContent?.trim() || '');
    });
  });

  // Get table headers
  const headers = await tableLocator.locator('thead th').evaluateAll(headers => {
    return headers.map(header => header.textContent?.trim() || '');
  });

  // Create worksheet data
  const wsData = [headers, ...tableData];

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Companies');

  // Save to XLSX file
  const outputPath = path.join(__dirname, '..', 'companies_data.xlsx');
  XLSX.writeFile(wb, outputPath);

  console.log(`Table data extracted and saved to ${outputPath}`);

  await context.close();
});