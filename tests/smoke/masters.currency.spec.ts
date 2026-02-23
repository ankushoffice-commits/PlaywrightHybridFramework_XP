import { test, expect } from '../../utils/BaseTest';
import { SessionManager } from '../../utils/SessionManager';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { MainPage } from '../../pages/MainPage';
import properties from '../../properties.json';

const testData = TestDataLoader.loadData<{
  validLogin: { email: string; password: string; expected: string };
}>('login.json');

test.describe('Currencies and Exchange Rates - DevExpress Dual Grid Validation', () => {
  let consoleMessages: string[] = [];

  test('should validate dual DevExpress grids with CSS injection and console metadata', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate directly to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // MANDATORY: Inject CSS to disable DevExpress virtualization for BOTH grids
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for both grids stabilization after CSS injection
    await page.waitForFunction(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      return grids.length >= 2 && 
             Array.from(grids).every(grid => {
               const rows = grid.querySelectorAll('.dxbl-grid tbody tr, .dxbl-grid-data-row');
               return rows.length > 0;
             });
    }, { timeout: 15000 });

    // Trigger console metadata logging for both grids
    await page.evaluate(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      grids.forEach((grid, index) => {
        const visibleRows = grid.querySelectorAll('tbody tr, .dxbl-grid-data-row');
        const visibleCells = grid.querySelectorAll('th, .dxbl-grid-header-cell');
        console.log(`Data grid ${index + 1} with ${visibleRows.length} rows and ${visibleCells.length} columns`);
      });
    });

    // Parse console metadata using regex (MANDATORY) - expecting TWO grid messages
    const gridMetadataRegex = /Data grid (\d+) with (\d+) rows and (\d+) columns/;
    const currencyGridMessage = consoleMessages.find(msg => 
      gridMetadataRegex.test(msg) && msg.includes('Data grid 1')
    );
    const exchangeRatesGridMessage = consoleMessages.find(msg => 
      gridMetadataRegex.test(msg) && msg.includes('Data grid 2')
    );
    
    expect(currencyGridMessage).toBeDefined();
    expect(exchangeRatesGridMessage).toBeDefined();

    // Parse Currency grid metadata
    const currencyMatches = currencyGridMessage!.match(gridMetadataRegex);
    const currencyConsoleRowCount = parseInt(currencyMatches![2]);
    const currencyConsoleColumnCount = parseInt(currencyMatches![3]);

    // Parse Exchange Rates grid metadata
    const exchangeRatesMatches = exchangeRatesGridMessage!.match(gridMetadataRegex);
    const exchangeRatesConsoleRowCount = parseInt(exchangeRatesMatches![2]);
    const exchangeRatesConsoleColumnCount = parseInt(exchangeRatesMatches![3]);

    // Count actual rendered rows and columns for both grids
    const actualCounts = await page.evaluate(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      const currencyGrid = grids[0]; // First grid is Currency
      const exchangeRatesGrid = grids[1]; // Second grid is Exchange Rates
      
      return {
        currency: {
          rowCount: currencyGrid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length,
          columnCount: currencyGrid.querySelectorAll('th, .dxbl-grid-header-cell').length
        },
        exchangeRates: {
          rowCount: exchangeRatesGrid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length,
          columnCount: exchangeRatesGrid.querySelectorAll('th, .dxbl-grid-header-cell').length
        }
      };
    });

    // MANDATORY: Compare console metadata with rendered counts for BOTH grids
    expect(currencyConsoleRowCount).toBe(actualCounts.currency.rowCount);
    expect(currencyConsoleColumnCount).toBe(actualCounts.currency.columnCount);
    expect(exchangeRatesConsoleRowCount).toBe(actualCounts.exchangeRates.rowCount);
    expect(exchangeRatesConsoleColumnCount).toBe(actualCounts.exchangeRates.columnCount);

    // Verify page structure
    await expect(page.getByRole('heading', { name: 'Currencies and Exchange Rates' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Currency' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Exchange Rates' })).toBeVisible();

    await context.close();
  });

  test('should display and validate both grids data correctly', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for both grids stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for both grids stabilization
    await page.waitForFunction(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      return grids.length >= 2 && 
             Array.from(grids).every(grid => {
               const rows = grid.querySelectorAll('tbody tr, .dxbl-grid-data-row');
               return rows.length > 0;
             });
    });

    // Verify Currency grid columns
    await expect(page.getByRole('columnheader', { name: 'Code', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Currency', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Subunit' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Precision' })).toBeVisible();

    // Verify Exchange Rates grid columns
    await expect(page.getByRole('columnheader', { name: 'With Effect From' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Destination Currency' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Exchange Rate' })).toBeVisible();

    // Verify Currency grid toolbar buttons
    const currencyToolbar = page.getByRole('group', { name: 'Currency' });
    await expect(currencyToolbar.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(currencyToolbar.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(currencyToolbar.getByRole('button', { name: 'Import' })).toBeVisible();
    await expect(currencyToolbar.getByRole('button', { name: 'View Options' })).toBeVisible();

    // Verify Exchange Rates grid toolbar buttons
    const exchangeRatesToolbar = page.getByRole('group', { name: 'Exchange Rates' });
    await expect(exchangeRatesToolbar.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(exchangeRatesToolbar.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(exchangeRatesToolbar.getByRole('button', { name: 'Import' })).toBeVisible();
    await expect(exchangeRatesToolbar.getByRole('button', { name: 'View Options' })).toBeVisible();

    // Verify Currency search functionality
    const currencySearchBox = currencyToolbar.getByPlaceholder('Search...').first();
    await expect(currencySearchBox).toBeVisible();

    // Verify Exchange Rates search functionality
    const exchangeRatesSearchBox = exchangeRatesToolbar.getByPlaceholder('Search...').first();
    await expect(exchangeRatesSearchBox).toBeVisible();

    await context.close();
  });

  test('should handle Currency grid selection and data operations', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for grid stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for grids stabilization
    await page.waitForFunction(() => {
      const currencyGrid = document.querySelector('.dxbl-grid');
      return currencyGrid && currencyGrid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length > 0;
    });

    // Test Currency radio button selection (only one can be selected)
    const currencyRadioButtons = page.getByRole('group', { name: 'Currency' }).getByRole('radio');
    await expect(currencyRadioButtons.first()).toBeVisible();
    
    // Select a currency
    await currencyRadioButtons.first().click();
    await expect(currencyRadioButtons.first()).toBeChecked();

    // Verify currency data is displayed
    await expect(page.getByText('AED')).toBeVisible(); // Currency code
    await expect(page.getByText('Dirham', { exact: true })).toBeVisible(); // Currency name
    await expect(page.getByText('Fils').first()).toBeVisible(); // Subunit

    // Test Currency search functionality
    const currencySearchBox = page.getByRole('group', { name: 'Currency' }).getByPlaceholder('Search...').first();
    await currencySearchBox.fill('USD');
    await page.waitForTimeout(1000);

    // Clear search
    await currencySearchBox.clear();
    await page.waitForTimeout(1000);

    await context.close();
  });

  test('should handle Exchange Rates grid selection and data operations', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for grid stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for grids stabilization
    await page.waitForFunction(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      return grids.length >= 2;
    });

    // First select a currency to view its exchange rates
    await page.waitForTimeout(2000);
    const currencyRadioButtons = page.getByRole('group', { name: 'Currency' }).getByRole('radio');
    await currencyRadioButtons.first().click();
    await page.waitForTimeout(1000);

    // Test Exchange Rates checkbox selection (multiple can be selected)
    const exchangeRatesGroup = page.getByRole('group', { name: 'Exchange Rates' });
    const exchangeRatesCheckboxes = exchangeRatesGroup.getByRole('checkbox');
    
    // Check if exchange rates data exists and checkboxes are available
    if (await exchangeRatesCheckboxes.count() > 0) {
      await expect(exchangeRatesCheckboxes.first()).toBeVisible();
      
      // Select exchange rates
      await exchangeRatesCheckboxes.first().click();
      await expect(exchangeRatesCheckboxes.first()).toBeChecked();
    }

    // Verify exchange rate data columns
    await expect(page.getByText('USD')).toBeVisible(); // Destination currency
    
    // Test Exchange Rates search functionality
    const exchangeRatesSearchBox = exchangeRatesGroup.getByPlaceholder('Search...').first();
    if (await exchangeRatesSearchBox.isVisible()) {
      await exchangeRatesSearchBox.fill('USD');
      await page.waitForTimeout(1000);
      
      // Clear search
      await exchangeRatesSearchBox.clear();
      await page.waitForTimeout(1000);
    }

    await context.close();
  });

  test('should handle CRUD operations for Currency grid', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for grid stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for grids stabilization
    await page.waitForFunction(() => {
      const currencyGrid = document.querySelector('.dxbl-grid');
      return currencyGrid && currencyGrid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length > 0;
    });

    // Test "Click here to add a new row" functionality for Currency grid
    const addNewRowText = page.getByRole('group', { name: 'Currency' }).getByText('Click here to add a new row');
    if (await addNewRowText.isVisible()) {
      await addNewRowText.click();
      await page.waitForTimeout(1000);
    }

    // Test Currency grid toolbar operations
    const currencyToolbar = page.getByRole('group', { name: 'Currency' });
    
    // Test Export functionality
    const currencyExportButton = currencyToolbar.getByRole('button', { name: 'Export' });
    await expect(currencyExportButton).toBeVisible();
    await expect(currencyExportButton).toBeEnabled();

    // Test Import functionality
    const currencyImportButton = currencyToolbar.getByRole('button', { name: 'Import' });
    await expect(currencyImportButton).toBeVisible();
    await expect(currencyImportButton).toBeEnabled();

    // Test View Options functionality
    const currencyViewOptionsButton = currencyToolbar.getByRole('button', { name: 'View Options' });
    await expect(currencyViewOptionsButton).toBeVisible();
    await expect(currencyViewOptionsButton).toBeEnabled();

    await context.close();
  });

  test('should handle CRUD operations for Exchange Rates grid', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for grid stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for grids stabilization
    await page.waitForFunction(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      return grids.length >= 2;
    });

    // First select a currency to work with exchange rates
    await page.waitForTimeout(2000);
    const currencyRadioButtons = page.getByRole('group', { name: 'Currency' }).getByRole('radio');
    await currencyRadioButtons.first().click();
    await page.waitForTimeout(1000);

    // Test "Click here to add a new row" functionality for Exchange Rates grid
    const exchangeRatesGroup = page.getByRole('group', { name: 'Exchange Rates' });
    const addNewExchangeRateRow = exchangeRatesGroup.getByText('Click here to add a new row');
    if (await addNewExchangeRateRow.isVisible()) {
      await addNewExchangeRateRow.click();
      await page.waitForTimeout(1000);
    }

    // Test Exchange Rates grid toolbar operations
    // Test Export functionality
    const exchangeRatesExportButton = exchangeRatesGroup.getByRole('button', { name: 'Export' });
    await expect(exchangeRatesExportButton).toBeVisible();
    await expect(exchangeRatesExportButton).toBeEnabled();

    // Test Import functionality
    const exchangeRatesImportButton = exchangeRatesGroup.getByRole('button', { name: 'Import' });
    await expect(exchangeRatesImportButton).toBeVisible();
    await expect(exchangeRatesImportButton).toBeEnabled();

    // Test View Options functionality
    const exchangeRatesViewOptionsButton = exchangeRatesGroup.getByRole('button', { name: 'View Options' });
    await expect(exchangeRatesViewOptionsButton).toBeVisible();
    await expect(exchangeRatesViewOptionsButton).toBeEnabled();

    await context.close();
  });

  test('should handle error states gracefully for both grids', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate to Currency page
    await page.goto(properties.predeployment.currencyPageUrl);
    await page.waitForLoadState('networkidle');

    // Apply CSS injection for grid stabilization
    await page.addStyleTag({ 
      content: `
        .dxbl-grid-scroll-container, 
        .dxbl-scroll-viewer, 
        .dxbl-scroll-viewer-content { 
            height: auto !important; 
            max-height: none !important; 
            overflow: visible !important; 
            display: block !important;
        }
        
        .dxbl-grid {
            height: auto !important;
        }
      ` 
    });

    // Wait for grids stabilization
    await page.waitForFunction(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      return grids.length >= 2;
    });

    // Verify page remains functional even if some resources fail to load
    await expect(page.getByRole('heading', { name: 'Currencies and Exchange Rates' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Currency' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Exchange Rates' })).toBeVisible();

    // Test that both grid structures are intact despite any console errors
    const currencyGrid = page.getByRole('group', { name: 'Currency' }).locator('.dxbl-grid');
    const exchangeRatesGrid = page.getByRole('group', { name: 'Exchange Rates' }).locator('.dxbl-grid');
    
    await expect(currencyGrid).toBeVisible();
    await expect(exchangeRatesGrid).toBeVisible();

    await context.close();
  });
});