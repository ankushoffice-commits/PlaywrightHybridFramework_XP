# Login Fixtures Documentation

## Overview

The login system has been refactored to use Playwright fixtures that provide reusable, efficient authentication patterns across all tests. This eliminates code duplication and provides better session management.

## Available Fixtures

### 1. `authenticatedPage` - Auto-Authenticated Page
The most convenient fixture for tests that need an already authenticated page.

```typescript
test('My test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  
  // Page is already logged in with valid credentials
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  // Continue with your test logic...
});
```

**Features:**
- Automatically logs in using valid credentials from `testdata/login.json`
- Reuses existing sessions when possible (performance optimization)
- Handles session expiration automatically
- Page is ready to use immediately

### 2. `loginUser` - Dynamic Login Function
For tests that need to login with specific credentials or multiple users.

```typescript
test('My test', async ({ loginUser, loginData }) => {
  // Login with default valid credentials
  const page1 = await loginUser();
  
  // Login with custom credentials  
  const page2 = await loginUser({
    email: 'custom@example.com',
    password: 'custom123'
  });
  
  // Login with test data credentials
  const page3 = await loginUser(loginData.validLogin);
});
```

**Features:**
- Returns a fully authenticated Page object
- Supports custom credentials or defaults to valid login data
- Can create multiple authenticated sessions in same test
- Automatically handles cleanup

### 3. `loginData` - Test Data Access
Provides type-safe access to login test data from `testdata/login.json`.

```typescript
test('My test', async ({ loginData, loginUser }) => {
  // Access valid login credentials
  const validEmail = loginData.validLogin.email;
  
  // Access invalid login scenarios for negative testing
  const firstInvalidLogin = loginData.invalidLogins[0];
  
  // Use in login
  const page = await loginUser(loginData.validLogin);
});
```

**Data Structure:**
```typescript
interface LoginTestData {
  validLogin: {
    email: string;
    password: string;
    expected?: string;
  };
  invalidLogins: Array<{
    email: string;
    password: string;
    description: string;
    expectedErrors: string[];
  }>;
}
```

## Usage Patterns

### Pattern 1: Simple Authenticated Test (Most Common)
```typescript
test('Company management test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  await expect(page.getByRole('heading', { name: 'Company Trial Management' })).toBeVisible();
});
```

### Pattern 2: Multiple Users Test  
```typescript
test('Multi-user workflow', async ({ loginUser }) => {
  const adminPage = await loginUser();
  const userPage = await loginUser(); // Different session
  
  // Use both pages for different user workflows
  await adminPage.goto(adminUrl);
  await userPage.goto(userUrl);
});
```

### Pattern 3: Custom Credentials Test
```typescript
test('Special user test', async ({ loginUser }) => {
  const specialUser = await loginUser({
    email: 'special.user@company.com',
    password: 'SpecialPass123'
  });
  
  await specialUser.goto('https://coremasters.algorithms.com/');
});
```

### Pattern 4: Negative Login Testing
```typescript
test('Login validation', async ({ loginData, browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Test each invalid login scenario
  for (const invalidLogin of loginData.invalidLogins) {
    await page.goto('https://identity.algorithms.com/Account/Login');
    await page.getByRole('textbox', { name: 'Email' }).fill(invalidLogin.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidLogin.password);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    // Verify expected errors
    for (const expectedError of invalidLogin.expectedErrors) {
      await expect(page.getByText(expectedError)).toBeVisible();
    }
  }
  
  await context.close();
});
```

### Pattern 5: Session Management Test
```typescript
test('Session persistence', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  
  // Navigate to different pages using the same authenticated session
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  await expect(page.getByRole('heading')).toBeVisible();
  
  await page.goto('https://coremasters.algorithms.com/Masters');
  await expect(page.locator('body')).toBeVisible();
});
```

## Migration Guide

### Before (Old Pattern):
```typescript
test('My test', async ({ page }) => {
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  // Rest of test...
});
```

### After (New Pattern):
```typescript
test('My test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  await page.goto('https://coremasters.algorithms.com/CompanyTrial');
  // Rest of test...
});
```

## Benefits

1. **Code Reusability**: No more duplicated login code across tests
2. **Performance**: Session reuse reduces test execution time
3. **Maintainability**: Login credentials managed in one place (`testdata/login.json`)
4. **Type Safety**: TypeScript interfaces ensure data structure correctness
5. **Flexibility**: Support for multiple authentication scenarios
6. **Automatic Cleanup**: Contexts are automatically cleaned up after tests

## Import Statement
```typescript
import { test, expect } from '../utils/BaseTest';
// or
import { test, expect } from '../../utils/BaseTest'; // from subdirectories
```

## Session Management

The fixtures automatically handle:
- Creating new sessions when needed
- Reusing valid existing sessions (performance optimization)
- Detecting and handling expired sessions
- Saving session state for reuse
- Cleaning up contexts after test completion

Session files are stored as `session.json` in the project root and are automatically managed by the SessionManager utility.

## Error Handling

The fixtures include built-in error handling for:
- Session expiration and automatic re-authentication
- Network connectivity issues during login
- Invalid credentials (throws descriptive errors)
- Context cleanup on test failure