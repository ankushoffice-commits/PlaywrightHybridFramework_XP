# Company Trial Management Test Plan

## Application Overview

Test plan for the Company Trial Management application at https://coremasters.algorithms.com/CompanyTrial. This is a Blazor WebAssembly application using DevExpress data grid components for CRUD operations on company master data. The application requires authentication and includes features like data grid virtualization, filtering, export/import capabilities, and form-based company management.

## Test Scenarios

### 1. DevExpress Grid Validation and Console Metadata

**Seed:** `tests/seed.spec.ts`

#### 1.1. DevExpress Grid Virtualization Handling

**File:** `tests/smoke/grid-virtualization.spec.ts`

**Steps:**
  1. Inject CSS to disable DevExpress grid virtualization by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid styles
    - expect: CSS injection successfully disables virtualization
    - expect: Grid container styles are modified
    - expect: Virtualization is completely disabled
  2. Wait for Blazor to re-render after style injection and grid to stabilize
    - expect: Blazor re-rendering is complete
    - expect: Grid UI is stabilized
    - expect: All rows are now visible in DOM
  3. Force full grid rendering by ensuring all data rows are loaded
    - expect: All company records are visible in DOM
    - expect: Grid displays complete dataset
    - expect: No lazy loading artifacts remain
  4. Count total rendered rows in the grid DOM structure
    - expect: Accurate count of visible data rows
    - expect: Row count includes all company records
    - expect: Count excludes header and footer rows
  5. Count total rendered columns in the grid DOM structure
    - expect: Accurate count of grid columns
    - expect: Column count matches grid schema
    - expect: All columns are properly rendered

#### 1.2. Console Metadata Validation

**File:** `tests/smoke/console-metadata.spec.ts`

**Steps:**
  1. Capture browser console messages programmatically
    - expect: Console messages are successfully captured
    - expect: Message log contains grid metadata
    - expect: No console capture errors occur
  2. Parse console message using regex to extract 'Data grid with {n} rows and {n} columns' metadata
    - expect: Console message is found and parsed
    - expect: Row and column numbers are extracted correctly
    - expect: Regex parsing succeeds without errors
  3. Compare console-reported row count with DOM-rendered row count
    - expect: Console row count matches rendered row count exactly
    - expect: No discrepancy between console and DOM counts
    - expect: Validation passes without tolerance
  4. Compare console-reported column count with DOM-rendered column count
    - expect: Console column count matches rendered column count exactly
    - expect: Column metadata is consistent
    - expect: Grid schema matches console output
  5. Validate that console metadata exists only in browser console (not visible in DOM)
    - expect: Metadata message is not found in page DOM
    - expect: Console-only validation is confirmed
    - expect: Message exists exclusively in browser console

### 2. Authentication and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login and Navigation to Company Trial

**File:** `tests/smoke/auth-navigation.spec.ts`

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
  4. Navigate to Company Trial Management page
    - expect: Page loads successfully at /CompanyTrial URL
    - expect: Company Trial Management page is displayed
    - expect: Grid and toolbar are rendered

### 3. Company Data Grid Operations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Grid Display and Data Validation

**File:** `tests/smoke/grid-display.spec.ts`

**Steps:**
  1. Verify Company Trial Management heading is visible
    - expect: Page heading 'Company Trial Management' is displayed
    - expect: Heading is properly styled
    - expect: Page context is clear
  2. Verify Companies List group container is visible
    - expect: Companies List container is displayed
    - expect: Grid wrapper is properly rendered
    - expect: Container has correct ARIA roles
  3. Verify grid columns are displayed correctly (Code, Name, Status, Country Incorporated, Company Number, Functional Currency, Approval Region, Address Line 1, City, Post Code, Country, State)
    - expect: All expected columns are visible
    - expect: Column headers are correctly labeled
    - expect: Column order matches requirements
  4. Verify company records are displayed with data (codes like 00211454, 03022016-1, statuses showing 'Active', addresses)
    - expect: Company data is populated in grid
    - expect: All data fields show appropriate values
    - expect: Data formatting is correct and consistent
  5. Verify grid toolbar buttons are available (Delete, Export, Import, View Options)
    - expect: All toolbar buttons are visible
    - expect: Buttons are properly labeled
    - expect: Button states reflect current selection

#### 3.2. Grid Filtering and Search

**File:** `tests/smoke/grid-filtering.spec.ts`

**Steps:**
  1. Click on a column header to open filter dialog
    - expect: Filter dialog opens for the selected column
    - expect: Dialog shows 'Filter Values' title
    - expect: Filter options are displayed or 'No filters available' message
  2. Use the search box to filter grid data
    - expect: Search functionality filters visible records
    - expect: Grid updates to show matching results
    - expect: Search is case-insensitive
  3. Clear filters and verify full data set returns
    - expect: All company records are restored
    - expect: Grid shows complete dataset
    - expect: Row count returns to original value

#### 3.3. Export and Import Operations

**File:** `tests/smoke/export-import.spec.ts`

**Steps:**
  1. Click Export button and verify export options
    - expect: Export dropdown opens
    - expect: Export format options are available
    - expect: Export process can be initiated
  2. Click Import button and verify import dialog
    - expect: Import dialog opens
    - expect: File selection interface is displayed
    - expect: Import process can be initiated
  3. Click View Options button
    - expect: View Options dialog opens
    - expect: Column visibility options are available
    - expect: Grid display can be customized

### 4. Company CRUD Operations

**Seed:** `tests/seed.spec.ts`

#### 4.1. Create New Company

**File:** `tests/smoke/create-company.spec.ts`

**Steps:**
  1. Click 'New Company' button at the bottom of the page
    - expect: Navigation to Company form page occurs
    - expect: URL changes to /Company with FormMode=New parameter
    - expect: Company form is displayed
  2. Verify Company form elements are loaded (Edit, Save, Cancel, Actions buttons)
    - expect: Company form heading is displayed
    - expect: Form toolbar with Edit, Save, Cancel, Actions buttons is visible
    - expect: Form is ready for data entry
  3. Test Save button functionality
    - expect: Save button is enabled and clickable
    - expect: Form validation occurs
    - expect: Appropriate save behavior is triggered
  4. Test Cancel button to return to grid
    - expect: Cancel action returns to Company Trial list
    - expect: Grid page is restored
    - expect: No changes are persisted

#### 4.2. Edit Existing Company

**File:** `tests/smoke/edit-company.spec.ts`

**Steps:**
  1. Select a company record from the grid
    - expect: Company record is highlighted/selected
    - expect: Selection state is visible
    - expect: Edit operations become available
  2. Click Edit button in grid toolbar
    - expect: Company form opens in edit mode
    - expect: Form is populated with existing company data
    - expect: Form enables editing capabilities
  3. Verify form pre-population with company data
    - expect: All company fields show existing data
    - expect: Data matches grid display
    - expect: Form is ready for modifications
  4. Test form Actions dropdown menu
    - expect: Actions menu opens with available options
    - expect: Menu items are appropriate for edit mode
    - expect: Additional operations are accessible

#### 4.3. Delete Company Operation

**File:** `tests/smoke/delete-company.spec.ts`

**Steps:**
  1. Select a company record from the grid
    - expect: Company record is selected
    - expect: Delete button becomes enabled
    - expect: Selection is visually indicated
  2. Click Delete button in grid toolbar
    - expect: Delete confirmation dialog appears
    - expect: Confirmation message is clear
    - expect: Delete can be confirmed or cancelled
  3. Test delete confirmation and cancellation
    - expect: Confirmation proceeds with delete action
    - expect: Cancellation preserves the record
    - expect: Appropriate feedback messages are shown

### 5. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Grid Error States

**File:** `tests/smoke/error-handling.spec.ts`

**Steps:**
  1. Test grid behavior with no data
    - expect: Grid displays appropriate 'no data' message
    - expect: Grid structure remains intact
    - expect: User interface remains functional
  2. Test grid loading states
    - expect: Loading indicators are shown during data fetch
    - expect: Grid maintains usability during loading
    - expect: Loading states are cleared when complete
  3. Test form validation errors
    - expect: Validation messages are clear and helpful
    - expect: Form prevents invalid submissions
    - expect: Error states are visually distinct
  4. Test network error scenarios
    - expect: Network errors are handled gracefully
    - expect: User receives appropriate error messages
    - expect: Application remains stable during errors
