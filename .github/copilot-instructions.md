# Playwright Framework - AI Agent Instructions

## Architecture Overview
This is a Playwright-based hybrid testing framework combining Page Object Model (POM) with utility-driven architecture for the Algorithms CoreMasters application. Tests target two domains:
- Login: `https://identity.algorithms.com/Account/Login`
- Main app: `https://coremasters.algorithms.com/`

## Framework Structure
- `pages/`: Page Object classes encapsulating page-specific logic
- `utils/`: Utility classes for session management, data loading, and base test setup
- `tests/`: Test specifications using page objects and utilities

## Page Object Pattern
Use dedicated page classes for encapsulation:
```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  async login(email: string, password: string) { /* ... */ }
}

// pages/MainPage.ts
export class MainPage {
  constructor(private page: Page) {}
  async navigateToCompany() { /* ... */ }
}
```

## Session Management Pattern
Use SessionManager for authentication state:
```typescript
// Create authenticated session
const context = await SessionManager.createAuthenticatedSession(browser, email, password);

// Reuse in tests
const context = await SessionManager.loadAuthenticatedSession(browser);
```

## Test Data Management
Use TestDataLoader for type-safe data loading:
```typescript
const testData = TestDataLoader.loadData<MyDataType>('data.json');
```

## Navigation Patterns
For menu-driven navigation in CoreMasters:
1. `await mainPage.openMenu()`
2. `await mainPage.navigateToMasters()`
3. `await mainPage.navigateToCompany()`

## Configuration Notes
- `fullyParallel: false` and `workers: 1` - tests run sequentially
- Only Chromium browser enabled in [playwright.config.ts](playwright.config.ts)
- HTML reporter generates reports in `playwright-report/`
- Traces captured on first retry for debugging

## Running Tests
Use `npx playwright test [file.spec.ts]` directly (no npm scripts configured).
Add `--headed` for visual debugging: `npx playwright test --headed`

## Selector Preferences
Prefer accessibility-based selectors in page objects:
- `page.getByRole('textbox', { name: 'Email' })`
- `page.getByRole('button', { name: 'Log in' })`
- `page.getByRole('link', { name: 'Company' })`

## Waiting Strategies
- Use `await page.waitForLoadState('networkidle')` for full page loads
- `await page.waitForTimeout(4000)` for specific delays (4 seconds common)
- Expect URL changes: `await expect(page).toHaveURL(/CompanyTrial/)`</content>
<parameter name="filePath">c:\Users\ankush.singh\Documents\AI\playwright framework\.github\copilot-instructions.md