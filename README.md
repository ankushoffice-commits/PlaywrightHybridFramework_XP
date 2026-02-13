# Playwright Test Automation Framework

A hybrid testing framework built with Playwright and TypeScript, combining Page Object Model (POM) with utility-driven architecture for testing the Xpedeon Web application across multiple environments.

## 🎯 Project Overview

This framework is designed to automate end-to-end tests for the Xpedeon Web application, providing reliable and maintainable test automation with session management, data-driven testing, and CI/CD integration capabilities.

**Target Applications:**
- Login Portal: `https://identity.algorithms.com/Account/Login`
- Main Application: `https://coremasters.algorithms.com/`
- UAT Environment: `https://coremasters-uat.algorithms.com/`

## 🏗️ Architecture

The framework follows a hybrid approach combining:
- **Page Object Model (POM)**: Encapsulates page-specific logic and elements
- **Utility-Driven Design**: Reusable utilities for session management, data loading, and test setup
- **Type-Safe Data Management**: Strongly typed test data using TypeScript
- **Multi-Environment Support**: Configuration for different deployment stages
- **Test Planning Integration**: Spec-driven testing with markdown planning files
- **AI-Powered Test Automation**: Intelligent agents for automated test lifecycle management

### Project Structure

```
playwright framework/
├── .github/                  # GitHub Actions workflows
│   ├── agents/              # AI agents for test automation
│   │   ├── playwright-test-planner.agent.md    # Test planning agent
│   │   ├── playwright-test-generator.agent.md  # Test generation agent
│   │   └── playwright-test-healer.agent.md     # Test healing agent
│   ├── workflows/           # CI/CD pipeline definitions
│   └── copilot-instructions.md
├── pages/                    # Page Object classes
│   ├── LoginPage.ts         # Login page interactions
│   └── MainPage.ts          # Main app navigation and interactions
├── specs/                    # Test planning and specifications
│   ├── masters-e2e.plan.md # Test plan documentation
│   └── README.md
├── testdata/                 # Test data files
│   ├── login.json           # Authentication credentials
│   └── masters-verification.json # Masters menu verification data
├── tests/                    # Test specifications
│   ├── 1.login.spec.ts      # Login functionality tests
│   ├── 2.masters-company.spec.ts # Masters company navigation
│   ├── 3.extract-table.spec.ts   # Data extraction tests
│   ├── 4.check-tiles.spec.ts     # E2E Masters verification
│   ├── seed.spec.ts         # Test environment setup
│   ├── example.spec.ts      # Template test file
│   └── login-data.json      # Legacy test data (deprecated)
├── utils/                    # Utility classes
│   ├── BaseTest.ts          # Base test configuration
│   ├── Environment.ts       # Environment management
│   ├── SessionManager.ts    # Authentication state management
│   └── TestDataLoader.ts    # Test data loading utility
├── .playwright-mcp/          # MCP (Model Context Protocol) files
│   ├── console-*.log        # Browser console logs
│   └── snapshot.md          # Page state snapshots
├── .vscode/                  # VS Code configuration
│   └── mcp.json             # MCP server configuration
├── playwright-report/        # HTML test reports
├── test-results/            # Test execution artifacts
├── azure-pipelines.yml      # Azure DevOps pipeline
├── companies_data.xlsx      # Extracted business data
├── playwright.config.ts     # Playwright configuration
├── properties.json          # Multi-environment configuration
└── session.json            # Saved authentication state
```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Git for version control
- Chromium browser (auto-installed with Playwright)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "playwright framework"
```

2. Install dependencies:
```bash
npm ci
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

### Environment Configuration

The framework supports multiple environments configured in [properties.json](properties.json):
- **predeployment**: Main production environment
- **postdeployment**: Post-deployment verification
- **uat**: User Acceptance Testing environment

Update the `stage` property in [properties.json](properties.json) to switch environments.

## 🤖 AI-Powered Test Automation Agents

The framework includes three intelligent agents that automate different aspects of the testing lifecycle using Model Context Protocol (MCP) and Playwright integration:

### 🎯 Test Planner Agent
**File**: [.github/agents/playwright-test-planner.agent.md](.github/agents/playwright-test-planner.agent.md)

An expert web test planner that creates comprehensive test plans by:
- Automatically exploring web applications and interfaces
- Identifying all interactive elements, forms, and navigation paths
- Generating detailed test scenarios with steps and expected outcomes
- Creating structured test plans in markdown format
- Discovering edge cases and comprehensive test coverage requirements

**Key Features:**
- Browser-based application exploration
- Automated interface discovery
- Comprehensive test scenario generation
- Test plan documentation in [specs/](specs/) directory

### ⚙️ Test Generator Agent
**File**: [.github/agents/playwright-test-generator.agent.md](.github/agents/playwright-test-generator.agent.md)

A Playwright test generator that creates robust, reliable test automation code by:
- Converting test plans into executable Playwright tests
- Generating type-safe test implementations
- Creating proper assertions and validations
- Following framework patterns and best practices
- Implementing robust selector strategies

**Key Features:**
- Automated test code generation from plans
- Framework-aware implementations
- Page Object Model integration
- Type-safe test data handling

### 🔧 Test Healer Agent
**File**: [.github/agents/playwright-test-healer.agent.md](.github/agents/playwright-test-healer.agent.md)

A test debugging and repair specialist that automatically fixes failing tests by:
- Systematically identifying and diagnosing test failures
- Analyzing browser state, console errors, and network requests
- Updating selectors and assertions to match application changes
- Improving test reliability and maintainability
- Providing resilient test implementations

**Key Features:**
- Automated error diagnosis and resolution
- Dynamic selector healing
- Test reliability improvements
- Real-time debugging capabilities

### MCP Integration

The agents are powered by the Model Context Protocol (MCP) with Playwright integration:

```json
{
  "servers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

**Benefits:**
- **Accelerated Development**: Automated test creation reduces manual effort
- **Improved Reliability**: AI-driven healing maintains test stability
- **Comprehensive Coverage**: Intelligent planning ensures thorough testing
- **Reduced Maintenance**: Automated updates adapt to application changes

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

### Run Specific Test Suites
```bash
# Login functionality
npx playwright test tests/1.login.spec.ts

# Masters navigation
npx playwright test tests/2.masters-company.spec.ts

# Data extraction
npx playwright test tests/3.extract-table.spec.ts

# E2E Masters verification
npx playwright test tests/4.check-tiles.spec.ts
```

### View Test Report
```bash
npx playwright show-report
```

### Debug Mode
```bash
npx playwright test --debug
npx playwright test --ui
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

Test data is organized in the [testdata/](testdata/) directory with structured JSON files:

```typescript
import { TestDataLoader } from '../utils/TestDataLoader';

// Load login credentials
const loginData = TestDataLoader.loadData<{
  validLogin: { email: string; password: string; expected: string };
}>('login.json');

// Load Masters verification data
const mastersData = TestDataLoader.loadData<{
  mastersMenuItems: string[];
  specialCases: { exactMatch: string[] };
  expectedCount: number;
}>('masters-verification.json');

test('login with valid credentials', async ({ page }) => {
  await loginPage.login(loginData.validLogin.email, loginData.validLogin.password);
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

Store test data in JSON files under the [testdata/](testdata/) directory:

**[testdata/login.json](testdata/login.json)**:
```json
{
  "validLogin": {
    "email": "suraj.prajapati@algosoftware.com",
    "password": "Suraj@1994",
    "expected": "Hello"
  },
  "invalidLogins": [
    {
      "description": "empty email and password",
      "email": "",
      "password": "",
      "expectedErrors": ["The Email field is required.", "The Password field is required."]
    }
  ]
}
```

**[testdata/masters-verification.json](testdata/masters-verification.json)**:
```json
{
  "mastersMenuItems": [
    "Service Discovery",
    "Company",
    "Currencies and Exchange Rates",
    "Unit Of Measure"
  ],
  "specialCases": {
    "exactMatch": ["Company"]
  },
  "expectedCount": 35
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

## � CI/CD Integration

The framework supports multiple CI/CD platforms:

### GitHub Actions

Configured in [.github/workflows/playwright.yml](.github/workflows/playwright.yml):
- Triggers on push/PR to main/master branches
- Runs on Windows environment
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads test reports as artifacts

### Azure Pipelines

Configured in [azure-pipelines.yml](azure-pipelines.yml):
- Triggers on main/master branches
- Windows-based build agent
- Automated dependency installation
- Test execution with report generation
- Artifact publishing for reports

### Manual Pipeline Triggers
```bash
# For Azure DevOps integration
git push azure main

# For GitHub Actions
git push origin main
```

## 📋 Test Planning

The framework includes comprehensive test planning in the [specs/](specs/) directory:

- **Test Plans**: Markdown files documenting test scenarios
- **E2E Scenarios**: Complete user journey testing
- **Spec Integration**: Tests reference planning files for traceability

Example test plan structure:
```markdown
# Masters Tab E2E Test Plan

## Test Scenarios

### 1.1. Login and verify all Masters sub-contents are present
**File:** `tests/4.check-tiles.spec.ts`
**Steps:**
  1. Navigate to login page
  2. Enter valid credentials
  3. Verify Masters menu items
```

## 📦 Dependencies

### Core Dependencies
- `@playwright/test`: ^1.58.2 - Test automation framework
- `playwright`: ^1.58.2 - Browser automation library
- `xlsx`: ^0.18.5 - Excel file processing for data extraction

### Dev Dependencies
- `@types/node`: ^25.0.9 - TypeScript type definitions
- `docx`: ^9.5.1 - Word document generation
- `markdown-to-txt`: ^2.0.1 - Markdown conversion utilities

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
3. **Environment configuration**: Ensure correct environment is set in [properties.json](properties.json)
4. **Timeout errors**: Increase timeout in test or use proper wait strategies
5. **CI/CD failures**: Check workflow logs and ensure all dependencies are installed

### Debug Mode

Run tests in debug mode:
```bash
npx playwright test --debug
npx playwright test --ui
npx playwright test --trace on
```

### Environment Troubleshooting

If tests fail due to environment issues:
1. Verify the correct environment URLs in [properties.json](properties.json)
2. Check network connectivity to target applications
3. Validate test data in [testdata/](testdata/) directory
4. Ensure authentication credentials are current

## 🤝 Contributing

1. Follow the existing project structure
2. Use TypeScript for type safety
3. Follow the Page Object Model pattern
4. Store test data in the [testdata/](testdata/) directory
5. Create test plans in [specs/](specs/) directory
6. Write descriptive test names following the naming convention
7. Update documentation for new features
8. Ensure tests pass in CI/CD pipelines
9. Add appropriate environment configurations
10. Follow the session management patterns

### Development Workflow

1. Create feature branch from main
2. Write tests following existing patterns
3. Add test data and planning documentation
4. Run tests locally to ensure they pass
5. Commit changes with descriptive messages
6. Create pull request for review
7. Ensure CI/CD pipelines pass
8. Merge after approval

### Adding New Tests

1. **Create Test Plan**: Use the Test Planner Agent or create test planning file in [specs/](specs/)
2. **Add Test Data**: Store test data in [testdata/](testdata/)
3. **Generate Tests**: Use the Test Generator Agent or implement tests manually following existing patterns
4. **Heal Failed Tests**: Use the Test Healer Agent for debugging and fixing issues
5. Reference spec file in test comments
6. Update README if needed

### Using AI Agents

The framework includes three AI agents to accelerate your testing workflow:

```bash
# Use agents in GitHub Codespaces or compatible environments
# Test Planner Agent - Explore application and create test plans
# Test Generator Agent - Generate Playwright tests from plans  
# Test Healer Agent - Debug and fix failing tests automatically
```

**Agent Benefits:**
- Automated test planning and coverage analysis
- Code generation following framework patterns
- Self-healing test maintenance
- Reduced manual debugging effort

## 📄 License

ISC

## 👥 Author

- Ankush Singh

---

**Last Updated**: February 13, 2026
**Framework Version**: 1.0.0
**Playwright Version**: 1.58.2
