# External Entity Roles - Security Masters Test Plan

## Application Overview

Test plan for the External Entity Roles page (https://coremasters.algorithms.com/ExternalEntityRolesPage?stepType=Master&stepCode=EXTERNALENTITYROLES&processCode=SECURITY). This page manages security configurations for external entity roles including role definitions, applicability settings, and scope configurations. The page features a DevExpress treegrid with virtualization that requires CSS injection for accurate testing.

## Test Scenarios

### 1. External Entity Roles Grid Validation and Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page Load and Authentication

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Navigate to External Entity Roles page URL
    - expect: Page redirects to login if not authenticated
    - expect: After authentication, page loads successfully
    - expect: Page title shows 'External Entity Roles'
  2. Verify page structure and navigation breadcrumbs
    - expect: Masters breadcrumb is visible and clickable
    - expect: Global Tax Management, Subcontracting, and Vat navigation options are present
    - expect: Page heading 'External Entity Roles' is displayed

#### 1.2. DevExpress Grid Virtualization Handling

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Inject CSS to disable DevExpress grid virtualization for accurate testing
    - expect: CSS injection targets .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, .dxbl-grid classes
    - expect: Grid virtualization is disabled
    - expect: All grid rows become fully rendered and accessible
  2. Wait for Blazor to re-render grid after CSS injection
    - expect: Grid stabilizes after style changes
    - expect: UI is ready for interaction
    - expect: No pending re-renders

#### 1.3. Grid Data Validation and Console Metadata

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Capture and validate console metadata message for grid dimensions
    - expect: Console contains message 'Data grid with {n} rows and {n} columns'
    - expect: Parse console message using regex to extract row and column counts
    - expect: Console reports main grid has 14 data rows and 15 columns
  2. Count actual rendered grid rows and columns
    - expect: Main treegrid contains 15 total rows (including header)
    - expect: Grid has exactly 14 data rows (excluding header)
    - expect: Grid has 15 columns as defined in colgroup structure
  3. Validate console metadata matches rendered grid data
    - expect: Console row count (14) equals rendered data row count (14)
    - expect: Console column count (15) equals rendered column count (15)
    - expect: No discrepancy between console metadata and actual DOM
  4. Verify grid column headers and structure
    - expect: Selection column (radio buttons) is present
    - expect: Role Number, Role Name, Step Code, Code Prefix columns exist
    - expect: AR Applicable, AP Applicable, Division Applicable columns exist
    - expect: Force Global Domain, Default Scope, Is Factor columns exist
    - expect: Inter Company, Individual Corporate, Use With CRM, Use With Employee columns exist

#### 1.4. Grid Data Content Validation

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Validate sample data rows in the grid
    - expect: First row contains 'Creditor/Supplier/Subcontractor' role
    - expect: Row with 'Client' role exists
    - expect: Row with 'Employee' role exists
    - expect: Row with 'InterCompany' role exists
    - expect: All expected entity roles are present in grid
  2. Verify boolean column values display correctly
    - expect: Checkbox columns show correct checked/unchecked states
    - expect: AR Applicable column shows true/false values appropriately
    - expect: AP Applicable, Division Applicable columns display boolean states
    - expect: Use With CRM and Use With Employee columns show correct states

#### 1.5. Toolbar and Action Buttons

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Verify main action toolbar functionality
    - expect: Edit button is visible and enabled
    - expect: Save button is visible but disabled by default
    - expect: Cancel button is visible but disabled by default
    - expect: Actions dropdown button is visible and clickable
  2. Verify grid-specific toolbar actions
    - expect: Export button is present and clickable
    - expect: Import button is present and clickable
    - expect: View Options button is present and clickable
    - expect: Search functionality is available with search box

#### 1.6. Row Selection and Navigation

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Test grid row selection using radio buttons
    - expect: Radio buttons are present in first column
    - expect: Clicking radio button selects the row
    - expect: Only one row can be selected at a time
    - expect: Selected row is highlighted/marked as selected
  2. Verify 'Click here to add a new row' functionality
    - expect: Add new row element is visible at bottom of data
    - expect: Element is clickable and responds to interaction
    - expect: Grid allows for new row addition

#### 1.7. Search and Filter Functionality

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Test search functionality with valid role names
    - expect: Search box accepts text input
    - expect: Search filters grid results appropriately
    - expect: Grid updates to show only matching results
    - expect: Clear search returns all rows
  2. Verify column sorting capabilities
    - expect: Column headers have sort indicators
    - expect: Clicking column headers sorts data
    - expect: Sort order changes between ascending/descending
    - expect: Grid data reorders correctly based on sort

#### 1.8. Groups and Collapsible Content

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Test collapsible External Entity Roles group
    - expect: Group header shows 'External Entity Roles' title
    - expect: Collapse button is present and functional
    - expect: Group can be collapsed and expanded
    - expect: Grid visibility toggles with group state

#### 1.9. Error Handling and Edge Cases

**File:** `tests/smoke/masters.ex_entity-roles.spec.ts`

**Steps:**
  1. Verify page behavior without authentication
    - expect: Unauthenticated access redirects to login
    - expect: Return URL preserves original page parameters
    - expect: Authentication flow works correctly
  2. Test grid behavior with CSS injection failure
    - expect: If CSS injection fails, implement manual scrolling as fallback
    - expect: All grid rows must be validated regardless of method
    - expect: Test should not fail due to virtualization issues
