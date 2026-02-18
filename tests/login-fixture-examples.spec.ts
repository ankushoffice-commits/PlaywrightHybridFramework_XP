// Example tests demonstrating different ways to use the login fixtures

import { test, expect } from '../utils/BaseTest';

test.describe('Login Fixture Examples', () => {
  
  // Example 1: Using authenticatedPage fixture (automatic login with valid credentials)
  test('Example 1: Using authenticatedPage fixture', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    
    // Page is already authenticated, can directly navigate to protected pages
    await page.goto('https://coremasters.algorithms.com/CompanyTrial?stepType=Master&stepCode=CompanyTrial&processCode=Masters');
    await expect(page.getByRole('heading', { name: 'Company Trial Management' })).toBeVisible();
  });

  // Example 2: Using loginUser fixture for dynamic login
  test('Example 2: Using loginUser fixture for dynamic login', async ({ loginUser, loginData }) => {
    // Login with default valid credentials
    const page = await loginUser();
    
    await page.goto('https://coremasters.algorithms.com/');
    await expect(page.locator('body')).toBeVisible();
    
    // You can also login with specific credentials
    const customCredentials = {
      email: 'custom@example.com', 
      password: 'custom123'
    };
    // const customPage = await loginUser(customCredentials);
  });

  // Example 3: Using loginData fixture to access test data
  test('Example 3: Using loginData fixture', async ({ loginData, loginUser }) => {
    // Access valid login credentials
    console.log('Valid email:', loginData.validLogin.email);
    
    // Access invalid login scenarios
    console.log('Invalid scenarios count:', loginData.invalidLogins.length);
    
    // Use specific credentials
    const page = await loginUser(loginData.validLogin);
    await page.goto('https://coremasters.algorithms.com/');
    await expect(page.locator('body')).toBeVisible();
  });

  // Example 4: Testing invalid login scenarios
  test('Example 4: Testing invalid login scenarios', async ({ loginData, browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Test the first invalid login scenario
    const invalidLogin = loginData.invalidLogins[0]; // empty email and password
    
    await page.goto('https://identity.algorithms.com/Account/Login');
    await page.getByRole('textbox', { name: 'Email' }).fill(invalidLogin.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidLogin.password);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    // Should still be on login page due to validation errors
    await expect(page).toHaveURL(/Login/);
    
    await context.close();
  });

  // Example 5: Multiple users in same test
  test('Example 5: Multiple users in same test', async ({ loginUser, loginData }) => {
    // First user with valid credentials
    const user1Page = await loginUser(loginData.validLogin);
    await user1Page.goto('https://coremasters.algorithms.com/');
    
    // Second user with different credentials (if you had multiple valid users)
    const user2Page = await loginUser(); // Uses default valid credentials
    await user2Page.goto('https://coremasters.algorithms.com/');
    
    // Both pages are now authenticated and can be used simultaneously
    await expect(user1Page.locator('body')).toBeVisible();
    await expect(user2Page.locator('body')).toBeVisible();
  });
});