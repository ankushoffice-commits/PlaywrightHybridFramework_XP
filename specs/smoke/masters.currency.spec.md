# Currencies and Exchange Rates Test Plan

## Application Overview

Test plan for the Currencies and Exchange Rates application at https://coremasters.algorithms.com/CurrencyPage. This is a Blazor WebAssembly application using dual DevExpress data grids for managing currency master data and exchange rates. The application features two independent grids with virtualization, CRUD operations, filtering, export/import capabilities, and real-time exchange rate management.

## Test Scenarios

### 1. DevExpress Dual Grid Validation and Console Metadata

**Seed:** `tests/seed.spec.ts`

#### 1.1. DevExpress Grid Virtualization Handling

**File:** `tests/smoke/currency-grid-virtualization.spec.ts`

**Steps:**
  1. Inject CSS to disable DevExpress grid virtualization for both Currency and Exchange Rates grids by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid styles
    - expect: CSS injection successfully disables virtualization for both grids
    - expect: Grid container styles are modified for Currency grid
    - expect: Grid container styles are modified for Exchange Rates grid
    - expect: Virtualization is completely disabled for both grids
  2. Wait for Blazor to re-render after style injection and both grids to stabilize
    - expect: Blazor re-rendering is complete
    - expect: Currency grid UI is stabilized
    - expect: Exchange Rates grid UI is stabilized
    - expect: All rows are now visible in DOM for both grids
  3. Force full rendering for both grids by ensuring all data rows are loaded
    - expect: All currency records are visible in Currency grid DOM
    - expect: All exchange rate records are visible in Exchange Rates grid DOM
    - expect: Both grids display complete datasets
    - expect: No lazy loading artifacts remain in either grid
  4. Count total rendered rows and columns for Currency grid (expected: ~23 rows, 6 columns including selection)
    - expect: Accurate count of visible Currency data rows
    - expect: Currency row count includes all currency records
    - expect: Currency column count matches grid schema (Selection, Code, Currency, Subunit, Precision)
    - expect: Count excludes header and footer rows
  5. Count total rendered rows and columns for Exchange Rates grid (expected: ~15 rows, 5 columns)
    - expect: Accurate count of visible Exchange Rates data rows
    - expect: Exchange Rates row count includes all rate records
    - expect: Exchange Rates column count matches grid schema (Selection, With Effect From, Destination Currency, Exchange Rate)
    - expect: Count excludes header and footer rows

#### 1.2. Console Metadata Validation for Dual Grids

**File:** `tests/smoke/currency-console-metadata.spec.ts`

**Steps:**
  1. Capture browser console messages programmatically
    - expect: Console messages are successfully captured
    - expect: Message log contains grid metadata for both grids
    - expect: No console capture errors occur
  2. Parse console messages using regex to extract 'Data grid with {n} rows and {n} columns' metadata for Currency grid
    - expect: Currency grid console message is found and parsed
    - expect: Currency grid row and column numbers are extracted correctly
    - expect: Currency grid regex parsing succeeds without errors
  3. Parse console messages using regex to extract 'Data grid with {n} rows and {n} columns' metadata for Exchange Rates grid
    - expect: Exchange Rates grid console message is found and parsed
    - expect: Exchange Rates grid row and column numbers are extracted correctly
    - expect: Exchange Rates grid regex parsing succeeds without errors
  4. Compare console-reported counts with DOM-rendered counts for Currency grid
    - expect: Currency console row count matches rendered row count exactly
    - expect: Currency console column count matches rendered column count exactly
    - expect: Currency grid validation passes without tolerance
  5. Compare console-reported counts with DOM-rendered counts for Exchange Rates grid
    - expect: Exchange Rates console row count matches rendered row count exactly
    - expect: Exchange Rates console column count matches rendered column count exactly
    - expect: Exchange Rates grid validation passes without tolerance
  6. Validate that console metadata exists only in browser console (not visible in DOM)
    - expect: Metadata messages are not found in page DOM
    - expect: Console-only validation is confirmed for both grids
    - expect: Messages exist exclusively in browser console

### 2. Authentication and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login and Navigation to Currency Page

**File:** `tests/smoke/currency-auth-navigation.spec.ts`

**Steps:**
  1. Navigate to login page at https://identity.algorithms.com/Account/Login
    - expect: Login page loads successfully
    - expect: Login form is displayed
    - expect: Email and password fields are visible
  2. Enter valid credentials (suraj.prajapati@algosoftware.com / Suraj@1994)
    - expect: Email field accepts input
    - expect: Password field accepts input (masked)
    - expect: Form validation passes
  3. Submit login form
    - expect: Authentication succeeds
    - expect: User is redirected to home page
    - expect: User email is displayed in navigation
  4. Navigate to Currency and Exchange Rates page
    - expect: Page loads successfully at /CurrencyPage URL
    - expect: Currencies and Exchange Rates page is displayed
    - expect: Both Currency and Exchange Rates grids are rendered

### 3. Currency Grid Operations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Currency Grid Display and Data Validation

**File:** `tests/smoke/currency-grid-display.spec.ts`

**Steps:**
  1. Verify Currencies and Exchange Rates heading is visible
    - expect: Page heading 'Currencies and Exchange Rates' is displayed
    - expect: Heading is properly styled
    - expect: Page context is clear
  2. Verify Currency group container is visible with proper grid structure
    - expect: Currency group container is displayed
    - expect: Currency grid wrapper is properly rendered
    - expect: Container has correct ARIA roles
  3. Verify Currency grid columns are displayed correctly (Selection, Code, Currency, Subunit, Precision)
    - expect: All expected Currency columns are visible
    - expect: Currency column headers are correctly labeled
    - expect: Currency column order matches requirements
  4. Verify currency records are displayed with data (codes like AED, AES, AFG, currencies like Dirham, Argentina Peso, Afghani)
    - expect: Currency data is populated in grid
    - expect: All currency data fields show appropriate values
    - expect: Currency data formatting is correct and consistent
  5. Verify Currency grid toolbar buttons are available (Delete, Export, Import, View Options)
    - expect: All Currency toolbar buttons are visible
    - expect: Currency buttons are properly labeled
    - expect: Currency button states reflect current selection
  6. Verify Currency grid radio button selection functionality
    - expect: Radio buttons for currency selection are visible
    - expect: Only one currency can be selected at a time
    - expect: Selection state is properly maintained

#### 3.2. Currency Grid Filtering and Search

**File:** `tests/smoke/currency-grid-filtering.spec.ts`

**Steps:**
  1. Click on a Currency grid column header to open filter dialog
    - expect: Currency filter dialog opens for the selected column
    - expect: Dialog shows 'Filter Values' title
    - expect: Currency filter options are displayed or 'No filters available' message
  2. Use the Currency grid search box to filter currency data
    - expect: Currency search functionality filters visible records
    - expect: Currency grid updates to show matching results
    - expect: Currency search is case-insensitive
  3. Clear Currency filters and verify full data set returns
    - expect: All currency records are restored
    - expect: Currency grid shows complete dataset
    - expect: Currency row count returns to original value

#### 3.3. Currency Grid Export and Import Operations

**File:** `tests/smoke/currency-export-import.spec.ts`

**Steps:**
  1. Click Currency Export button and verify export options
    - expect: Currency Export dropdown opens
    - expect: Currency export format options are available
    - expect: Currency export process can be initiated
  2. Click Currency Import button and verify import dialog
    - expect: Currency Import dialog opens
    - expect: Currency file selection interface is displayed
    - expect: Currency import process can be initiated
  3. Click Currency View Options button
    - expect: Currency View Options dialog opens
    - expect: Currency column visibility options are available
    - expect: Currency grid display can be customized

### 4. Exchange Rates Grid Operations

**Seed:** `tests/seed.spec.ts`

#### 4.1. Exchange Rates Grid Display and Data Validation

**File:** `tests/smoke/exchange-rates-grid-display.spec.ts`

**Steps:**
  1. Verify Exchange Rates group container is visible with proper grid structure
    - expect: Exchange Rates group container is displayed
    - expect: Exchange Rates grid wrapper is properly rendered
    - expect: Container has correct ARIA roles
  2. Verify Exchange Rates grid columns are displayed correctly (Selection, With Effect From, Destination Currency, Exchange Rate)
    - expect: All expected Exchange Rates columns are visible
    - expect: Exchange Rates column headers are correctly labeled
    - expect: Exchange Rates column order matches requirements
  3. Verify exchange rate records are displayed with data (dates, currencies like USD, rate values)
    - expect: Exchange rate data is populated in grid
    - expect: All exchange rate data fields show appropriate values
    - expect: Exchange rate data formatting is correct and consistent
  4. Verify Exchange Rates grid toolbar buttons are available (Delete, Export, Import, View Options)
    - expect: All Exchange Rates toolbar buttons are visible
    - expect: Exchange Rates buttons are properly labeled
    - expect: Exchange Rates button states reflect current selection
  5. Verify Exchange Rates grid checkbox selection functionality
    - expect: Checkboxes for exchange rate selection are visible
    - expect: Multiple rates can be selected simultaneously
    - expect: Selection state is properly maintained

#### 4.2. Exchange Rates Grid Filtering and Search

**File:** `tests/smoke/exchange-rates-grid-filtering.spec.ts`

**Steps:**
  1. Click on an Exchange Rates grid column header to open filter dialog
    - expect: Exchange Rates filter dialog opens for the selected column
    - expect: Dialog shows 'Filter Values' title
    - expect: Exchange Rates filter options are displayed or 'No filters available' message
  2. Use the Exchange Rates grid search box to filter rate data
    - expect: Exchange Rates search functionality filters visible records
    - expect: Exchange Rates grid updates to show matching results
    - expect: Exchange Rates search is case-insensitive
  3. Clear Exchange Rates filters and verify full data set returns
    - expect: All exchange rate records are restored
    - expect: Exchange Rates grid shows complete dataset
    - expect: Exchange Rates row count returns to original value

### 5. Currency and Exchange Rate CRUD Operations

**Seed:** `tests/seed.spec.ts`

#### 5.1. Create New Currency

**File:** `tests/smoke/create-currency.spec.ts`

**Steps:**
  1. Click 'Click here to add a new row' in Currency grid
    - expect: New empty currency row appears in Currency grid
    - expect: Currency grid enters edit mode
    - expect: Currency form fields are ready for data entry
  2. Enter new currency data (Code, Currency name, Subunit, Precision)
    - expect: Currency code field accepts input
    - expect: Currency name field accepts input
    - expect: Subunit and Precision fields accept appropriate values
  3. Test Save functionality for new currency
    - expect: Save operation completes successfully
    - expect: New currency appears in grid
    - expect: Currency data is properly formatted
  4. Test Cancel functionality for new currency
    - expect: Cancel operation discards new currency
    - expect: Grid returns to previous state
    - expect: No changes are persisted

#### 5.2. Create New Exchange Rate

**File:** `tests/smoke/create-exchange-rate.spec.ts`

**Steps:**
  1. Click 'Click here to add a new row' in Exchange Rates grid
    - expect: New empty exchange rate row appears in Exchange Rates grid
    - expect: Exchange Rates grid enters edit mode
    - expect: Exchange rate form fields are ready for data entry
  2. Enter new exchange rate data (Effect Date, Destination Currency, Rate)
    - expect: Effect date field accepts date input
    - expect: Destination currency field accepts currency selection
    - expect: Exchange rate field accepts numeric values
  3. Test Save functionality for new exchange rate
    - expect: Save operation completes successfully
    - expect: New exchange rate appears in grid
    - expect: Rate data is properly formatted
  4. Test Cancel functionality for new exchange rate
    - expect: Cancel operation discards new rate
    - expect: Grid returns to previous state
    - expect: No changes are persisted

#### 5.3. Edit Existing Currency and Exchange Rate

**File:** `tests/smoke/edit-currency-rate.spec.ts`

**Steps:**
  1. Select a currency record and test Edit functionality
    - expect: Currency record can be edited in-place
    - expect: Currency form fields accept modified values
    - expect: Edit mode is visually indicated
  2. Select an exchange rate record and test Edit functionality
    - expect: Exchange rate record can be edited in-place
    - expect: Rate form fields accept modified values
    - expect: Edit mode is visually indicated
  3. Test Save changes for both currency and exchange rate edits
    - expect: Save operations complete successfully
    - expect: Changes are reflected in grids
    - expect: Data validation is enforced

#### 5.4. Delete Currency and Exchange Rate Operations

**File:** `tests/smoke/delete-currency-rate.spec.ts`

**Steps:**
  1. Select currency records and click Delete button
    - expect: Delete confirmation dialog appears for currencies
    - expect: Confirmation message is clear
    - expect: Delete can be confirmed or cancelled
  2. Select exchange rate records and click Delete button
    - expect: Delete confirmation dialog appears for rates
    - expect: Confirmation message is clear
    - expect: Delete can be confirmed or cancelled
  3. Test delete confirmation and cancellation for both grids
    - expect: Confirmation proceeds with delete action
    - expect: Cancellation preserves the records
    - expect: Appropriate feedback messages are shown

### 6. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. Grid Error States

**File:** `tests/smoke/currency-error-handling.spec.ts`

**Steps:**
  1. Test Currency and Exchange Rates grids behavior with no data
    - expect: Grids display appropriate 'no data' messages
    - expect: Grid structures remain intact
    - expect: User interfaces remain functional
  2. Test both grids loading states
    - expect: Loading indicators are shown during data fetch for both grids
    - expect: Grids maintain usability during loading
    - expect: Loading states are cleared when complete
  3. Test form validation errors for currency and exchange rate data
    - expect: Validation messages are clear and helpful
    - expect: Forms prevent invalid submissions
    - expect: Error states are visually distinct
  4. Test network error scenarios
    - expect: Network errors are handled gracefully
    - expect: Users receive appropriate error messages
    - expect: Application remains stable during errors
