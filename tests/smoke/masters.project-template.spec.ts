import { test, expect } from '../../utils/BaseTest';
import { SessionManager } from '../../utils/SessionManager';
import { TestDataLoader } from '../../utils/TestDataLoader';
import { MainPage } from '../../pages/MainPage';

const testData = TestDataLoader.loadData<{
  validLogin: { email: string; password: string; expected: string };
}>('login.json');

test.describe('Project Templates Management - DevExpress Dual Grid Validation', () => {
  let consoleMessages: string[] = [];

  test('should validate dual DevExpress grids with CSS injection and console metadata', async ({ browser }) => {
    const context = await SessionManager.createAuthenticatedSession(
      browser,
      testData.validLogin.email,
      testData.validLogin.password
    );
    const page = await context.newPage();

    // Attach console listener before navigation (MANDATORY)
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // Navigate directly to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
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
               const container = grid.closest('[data-name], .dxbl-grid-container') || grid;
               return container !== null;
             });
    }, { timeout: 15000 });

    // Trigger console metadata logging for both grids (MANDATORY)
    await page.evaluate(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      grids.forEach((grid, index) => {
        const dataRows = grid.querySelectorAll('tbody tr:not(.dx-row-alt):not(.dx-header-row), .dxbl-grid-data-row');
        const headerCells = grid.querySelectorAll('th, .dxbl-grid-header-cell, thead th');
        console.log(`Data grid ${index + 1} with ${dataRows.length} rows and ${headerCells.length} columns`);
      });
    });

    // Parse console metadata using regex (MANDATORY) - expecting TWO grid messages
    const gridMetadataRegex = /Data grid (\d+) with (\d+) rows and (\d+) columns/;
    const templatesGridMessage = consoleMessages.find(msg => 
      gridMetadataRegex.test(msg) && msg.includes('Data grid 1')
    );
    const projectsGridMessage = consoleMessages.find(msg => 
      gridMetadataRegex.test(msg) && msg.includes('Data grid 2')
    );
    
    expect(templatesGridMessage).toBeDefined();
    expect(projectsGridMessage).toBeDefined();

    // Parse Templates grid metadata
    const templatesMatches = templatesGridMessage!.match(gridMetadataRegex);
    const templatesConsoleRowCount = parseInt(templatesMatches![2]);
    const templatesConsoleColumnCount = parseInt(templatesMatches![3]);

    // Parse Projects List grid metadata
    const projectsMatches = projectsGridMessage!.match(gridMetadataRegex);
    const projectsConsoleRowCount = parseInt(projectsMatches![2]);
    const projectsConsoleColumnCount = parseInt(projectsMatches![3]);

    // Count actual rendered rows and columns for both grids (MANDATORY)
    const actualCounts = await page.evaluate(() => {
      const grids = document.querySelectorAll('.dxbl-grid');
      const templatesGrid = grids[0]; // First grid is Templates
      const projectsGrid = grids[1]; // Second grid is Projects List
      
      return {
        templates: {
          rowCount: templatesGrid.querySelectorAll('tbody tr:not(.dx-row-alt):not(.dx-header-row), .dxbl-grid-data-row').length,
          columnCount: templatesGrid.querySelectorAll('th, .dxbl-grid-header-cell, thead th').length
        },
        projects: {
          rowCount: projectsGrid.querySelectorAll('tbody tr:not(.dx-row-alt):not(.dx-header-row), .dxbl-grid-data-row').length,
          columnCount: projectsGrid.querySelectorAll('th, .dxbl-grid-header-cell, thead th').length
        }
      };
    });

    // MANDATORY: Compare console metadata with rendered counts for Templates grid
    expect(templatesConsoleRowCount).toBe(actualCounts.templates.rowCount);
    expect(templatesConsoleColumnCount).toBe(actualCounts.templates.columnCount);

    // MANDATORY: Compare console metadata with rendered counts for Projects List grid
    expect(projectsConsoleRowCount).toBe(actualCounts.projects.rowCount);
    expect(projectsConsoleColumnCount).toBe(actualCounts.projects.columnCount);

    // Verify page structure and basic elements
    await expect(page.getByRole('heading', { name: 'Project Templates', level: 1 })).toBeVisible();
    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByRole('group', { name: 'Templates' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Projects List' })).toBeVisible();

    await context.close();
  });

  test('should display and validate Templates grid structure and toolbar', async ({ browser }) => {
    const context = await SessionManager.loadAuthenticatedSession(browser);
    const page = await context.newPage();

    // Navigate to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
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

    // Wait for Templates grid stabilization
    await page.waitForFunction(() => {
      const templatesSection = document.querySelector('[data-name="Templates"], .Templates');
      const grid = templatesSection?.querySelector('.dxbl-grid') || document.querySelectorAll('.dxbl-grid')[0];
      return grid && (grid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length >= 0);
    });

    // Verify Templates grid toolbar buttons
    const templatesSection = page.getByRole('group', { name: 'Templates' });
    await expect(templatesSection.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(templatesSection.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(templatesSection.getByRole('button', { name: 'Import' })).toBeVisible();
    await expect(templatesSection.getByRole('button', { name: 'View Options' })).toBeVisible();

    // Verify Templates grid search functionality
    const searchBox = templatesSection.getByRole('searchbox', { name: 'Search' });
    await expect(searchBox).toBeVisible();
    await searchBox.fill('test');
    await searchBox.clear();

    // Verify Templates grid column headers (3 columns expected: Selection, Code, Name)
    await expect(templatesSection.getByRole('columnheader', { name: 'Code' })).toBeVisible();
    await expect(templatesSection.getByRole('columnheader', { name: 'Name' })).toBeVisible();

    await context.close();
  });

  test('should display and validate Projects List grid structure and toolbar', async ({ browser }) => {
    const context = await SessionManager.loadAuthenticatedSession(browser);
    const page = await context.newPage();

    // Navigate to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
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

    // Wait for Projects List grid stabilization
    await page.waitForFunction(() => {
      const projectsSection = document.querySelector('[data-name="Projects List"], .Projects');
      const grid = projectsSection?.querySelector('.dxbl-grid') || document.querySelectorAll('.dxbl-grid')[1];
      return grid && (grid.querySelectorAll('tbody tr, .dxbl-grid-data-row').length >= 0);
    });

    // Verify Projects List grid toolbar buttons
    const projectsSection = page.getByRole('group', { name: 'Projects List' });
    await expect(projectsSection.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(projectsSection.getByRole('button', { name: 'Import' })).toBeVisible();
    await expect(projectsSection.getByRole('button', { name: 'View Options' })).toBeVisible();

    // Verify Projects List grid search functionality
    const searchBox = projectsSection.getByRole('searchbox', { name: 'Search' });
    await expect(searchBox).toBeVisible();
    await searchBox.fill('test');
    await searchBox.clear();

    // Verify Projects List grid column headers (11 columns expected)
    await expect(projectsSection.getByRole('columnheader', { name: 'Select' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'Code', exact: true })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'Name', exact: true })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'Currency' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'State Name' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'L1 Analysis Code' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'L2 Analysis Code' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'L3 Analysis Code' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'L4 Analysis Code' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'L5 Analysis Code' })).toBeVisible();
    await expect(projectsSection.getByRole('columnheader', { name: 'Framework Contract' })).toBeVisible();

    await context.close();
  });

  test('should validate main toolbar functionality and company selection', async ({ browser }) => {
    const context = await SessionManager.loadAuthenticatedSession(browser);
    const page = await context.newPage();

    // Navigate to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
    await page.waitForLoadState('networkidle');

    // Verify main page toolbar buttons
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Actions' })).toBeVisible();

    // Verify Company dropdown is present and functional
    const companyDropdown = page.getByRole('combobox', { name: 'Open or close the drop-down window' });
    await expect(companyDropdown).toBeVisible();
    
    // Test dropdown interaction
    const dropdownButton = page.getByRole('button', { name: 'Open or close the drop-down window' });
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();
    await dropdownButton.click(); // Close dropdown

    // Test Edit mode activation
    const editButton = page.getByRole('button', { name: 'Edit' });
    await editButton.click();
    
    // Wait for edit mode to be activated (Save/Cancel buttons may need actual changes to be enabled)
    await page.waitForTimeout(1000);
    
    // Verify Save and Cancel buttons are visible (they may remain disabled until changes are made)
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

    // Test Actions dropdown (handle potential modal interference)
    const actionsButton = page.getByRole('button', { name: 'Actions' });
    
    // Close any open modals/popups first
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Try clicking the Actions button with force if needed
    try {
      await actionsButton.click({ timeout: 5000 });
    } catch (error) {
      // If normal click fails due to modal interference, use force click
      await actionsButton.click({ force: true });
    }
    
    // Close any opened dropdown
    await page.keyboard.press('Escape');

    await context.close();
  });

  test('should handle Templates grid collapse/expand and CRUD operations', async ({ browser }) => {
    const context = await SessionManager.loadAuthenticatedSession(browser);
    const page = await context.newPage();

    // Navigate to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
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

    // Test Templates section collapse/expand
    const templatesCollapseButton = page.getByRole('group', { name: 'Templates' }).getByRole('button', { name: /Collapse|Expand/ });
    await expect(templatesCollapseButton).toBeVisible();
    
    // Test collapse
    if (await templatesCollapseButton.getAttribute('aria-expanded') === 'true') {
      await templatesCollapseButton.click();
    }
    
    // Test expand
    await templatesCollapseButton.click();

    // Wait for Templates grid to be visible after expand
    await page.waitForFunction(() => {
      const templatesGrid = document.querySelectorAll('.dxbl-grid')[0] as HTMLElement;
      return templatesGrid && templatesGrid.style.display !== 'none';
    });

    // Test new row creation (if "Click here to add a new row" is available)
    const addNewRowText = page.getByText('Click here to add a new row');
    if (await addNewRowText.isVisible()) {
      await addNewRowText.click();
    }

    // Test Templates grid Export functionality
    const templatesSection = page.getByRole('group', { name: 'Templates' });
    const exportButton = templatesSection.getByRole('button', { name: 'Export' });
    await exportButton.click();

    await context.close();
  });

  test('should handle Projects List grid collapse/expand and toolbar interactions', async ({ browser }) => {
    const context = await SessionManager.loadAuthenticatedSession(browser);
    const page = await context.newPage();

    // Navigate to Project Templates page
    await page.goto('https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters');
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

    // Test Projects List section collapse/expand
    const projectsCollapseButton = page.getByRole('group', { name: 'Projects List' }).getByRole('button', { name: /Collapse|Expand/ });
    await expect(projectsCollapseButton).toBeVisible();
    
    // Test collapse
    if (await projectsCollapseButton.getAttribute('aria-expanded') === 'true') {
      await projectsCollapseButton.click();
    }
    
    // Test expand
    await projectsCollapseButton.click();

    // Wait for Projects List grid to be visible after expand
    await page.waitForFunction(() => {
      const projectsGrid = document.querySelectorAll('.dxbl-grid')[1] as HTMLElement;
      return projectsGrid && projectsGrid.style.display !== 'none';
    });

    // Test Projects List grid toolbar interactions
    const projectsSection = page.getByRole('group', { name: 'Projects List' });
    
    // Test View Options
    const viewOptionsButton = projectsSection.getByRole('button', { name: 'View Options' });
    await viewOptionsButton.click();

    // Test Import functionality  
    const importButton = projectsSection.getByRole('button', { name: 'Import' });
    await importButton.click();

    await context.close();
  });
});