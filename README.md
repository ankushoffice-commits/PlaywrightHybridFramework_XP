# Playwright Test Automation Framework

A hybrid testing framework built with Playwright and TypeScript, combining Page Object Model (POM) with utility-driven architecture for testing the Algorithms CoreMasters application.

## 🎯 Project Overview

This framework is designed to automate end-to-end tests for the CoreMasters application, providing reliable and maintainable test automation with session management and data-driven testing capabilities.

**Target Applications:**
- Login Portal: `https://identity.algorithms.com/Account/Login`
- Main Application: `https://coremasters.algorithms.com/`

## 🏗️ Architecture

The framework follows a hybrid approach combining:
- **Page Object Model (POM)**: Encapsulates page-specific logic and elements
- **Utility-Driven Design**: Reusable utilities for session management, data loading, and test setup
- **Type-Safe Data Management**: Strongly typed test data using TypeScript

### Project Structure

```
playwright framework/
├── pages/                    # Page Object classes
│   ├── LoginPage.ts         # Login page interactions
│   └── MainPage.ts          # Main app navigation and interactions
├── tests/                    # Test specifications
│   ├── 1 - login.spec.ts
│   ├── 2 - masters-company.spec.ts
│   ├── 3 - extract-table.spec.ts
│   └── login-data.json      # Test data files
├── utils/                    # Utility classes
│   ├── BaseTest.ts          # Base test configuration
│   ├── Environment.ts       # Environment management
│   ├── SessionManager.ts    # Authentication state management
│   └── TestDataLoader.ts    # Test data loading utility
├── playwright-report/        # HTML test reports
├── test-results/            # Test execution artifacts
├── playwright.config.ts     # Playwright configuration
├── properties.json          # Application properties
└── session.json            # Saved session state
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chromium browser (auto-installed with Playwright)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/1 - login.spec.ts
```

### Run in Headed Mode (Visual)
```bash
npx playwright test --headed
```

### Run with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Login Tests (npm script)
```bash
npm run loginTest
```

### View Test Report
```bash
npx playwright show-report
```

## 📝 Writing Tests

### Page Object Pattern

Create page classes to encapsulate page-specific logic:

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
```

### Using Session Management

The framework includes built-in session management to avoid repeated logins:

```typescript
import { SessionManager } from '../utils/SessionManager';

// Create and save authenticated session
test('login and save session', async ({ browser }) => {
  const context = await SessionManager.createAuthenticatedSession(
    browser,
    email,
    password
  );
  await context.close();
});

// Reuse saved session
test('use saved session', async ({ browser }) => {
  const context = await SessionManager.loadAuthenticatedSession(browser);
  const page = await context.newPage();
  // ... your test logic
});
```

### Test Data Management

Load test data using the TestDataLoader utility:

```typescript
import { TestDataLoader } from '../utils/TestDataLoader';

const testData = TestDataLoader.loadData<YourDataType>('login-data.json');

test('login with valid credentials', async ({ page }) => {
  await loginPage.login(testData.validLogin.email, testData.validLogin.password);
});
```

## ⚙️ Configuration

### Playwright Configuration

Key settings in [playwright.config.ts](playwright.config.ts):

- **Sequential Execution**: `fullyParallel: false`, `workers: 1`
- **Browser**: Chromium only (configurable)
- **Headless Mode**: Disabled by default (`headless: false`)
- **Retries**: 0 (configurable)
- **Trace**: Captured on first retry
- **Reporter**: HTML reports in `playwright-report/`

### Test Data Configuration

Store test data in JSON files under the `tests/` directory:

```json
{
  "validLogin": {
    "email": "user@example.com",
    "password": "password123",
    "expected": "Dashboard"
  }
}
```

## 🎨 Best Practices

### Selector Strategy

Prefer accessibility-based selectors:
```typescript
// ✅ Good - Accessibility-focused
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email address')
page.getByText('Welcome')

// ❌ Avoid - Fragile selectors
page.locator('#submit-btn')
page.locator('.email-input')
```

### Wait Strategies

```typescript
// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for specific timeout
await page.waitForTimeout(4000);

// Wait for URL change
await expect(page).toHaveURL(/CompanyTrial/);
```

### Navigation Pattern

For menu-driven navigation:
```typescript
await mainPage.openMenu();
await mainPage.navigateToMasters();
await mainPage.navigateToCompany();
```

## 📦 Dependencies

### Core Dependencies
- `@playwright/test`: ^1.57.0 - Test automation framework
- `xlsx`: ^0.18.5 - Excel file processing

### Dev Dependencies
- `@types/node`: ^25.0.9 - TypeScript type definitions
- `docx`: ^9.5.1 - Word document generation
- `markdown-to-txt`: ^2.0.1 - Markdown conversion

## 📊 Reports and Debugging

### HTML Reports

After test execution, view the HTML report:
```bash
npx playwright show-report
```

### Traces

Traces are captured on first retry. View trace files:
```bash
npx playwright show-trace path/to/trace.zip
```

### Screenshots and Videos

Configure in `playwright.config.ts` to capture on failure:
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Session not found**: Run the login test first to create a session
2. **Element not found**: Verify selectors and add appropriate waits
3. **Timeout errors**: Increase timeout in test or use proper wait strategies

### Debug Mode

Run tests in debug mode:
```bash
npx playwright test --debug
```

## 🤝 Contributing

1. Follow the existing project structure
2. Use TypeScript for type safety
3. Follow the Page Object Model pattern
4. Add appropriate test data in JSON files
5. Write descriptive test names
6. Update documentation for new features

## 📄 License

ISC

## 👤 Author

Ankush Singh

---

**Last Updated**: February 2026
