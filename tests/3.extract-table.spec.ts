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

  // DevExpress Blazor uses virtual scrolling - we need to extract data while scrolling
  // Get headers first
  const headers = await tableLocator.locator('thead th').evaluateAll(headers => {
    return headers.map(header => header.textContent?.trim() || '');
  });

  // Extract data by scrolling through the grid and collecting unique rows
  const allData = await page.evaluate(async () => {
    const container = document.querySelector('.dxbl-scroll-viewer-content');
    if (!container) return [];
    
    const dataMap = new Map<string, string[]>(); // Use map to avoid duplicates
    const table = document.querySelector('table');
    if (!table) return [];
    
    // Function to extract current visible rows
    const extractVisibleRows = () => {
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach((row: any) => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map((cell: any) => cell.textContent?.trim() || '');
        
        // Skip empty rows and the "Click here to add" row
        if (rowData.length > 1 && rowData[1] && !rowData[0].includes('Click here')) {
          const key = rowData.slice(1, 4).join('|'); // Use Code+Name+Status as key
          if (key && key !== '||') {
            dataMap.set(key, rowData);
          }
        }
      });
    };
    
    // Initial extraction
    extractVisibleRows();
    
    // Scroll down gradually to capture all rows
    const maxScroll = container.scrollHeight;
    const step = 100; // Small steps for virtual scrolling
    
    for (let scrollPos = 0; scrollPos <= maxScroll; scrollPos += step) {
      container.scrollTop = scrollPos;
      await new Promise(r => setTimeout(r, 150)); // Wait for render
      extractVisibleRows();
    }
    
    // Ensure we're at bottom
    container.scrollTop = maxScroll;
    await new Promise(r => setTimeout(r, 300));
    extractVisibleRows();
    
    // Scroll to right to load all columns
    const maxScrollX = container.scrollWidth;
    for (let scrollX = 0; scrollX <= maxScrollX; scrollX += 200) {
      container.scrollLeft = scrollX;
      await new Promise(r => setTimeout(r, 100));
      extractVisibleRows();
    }
    
    // Reset position
    container.scrollTop = 0;
    container.scrollLeft = 0;
    
    return Array.from(dataMap.values());
  });

  console.log(`Extracted ${allData.length} unique rows from the table`);
  
  const tableData = allData;

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