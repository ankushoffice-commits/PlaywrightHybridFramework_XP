# Approval Region Master - Smoke Test Plan

## Application Overview

Test plan for the Approval Region master page in CoreMasters application. This page manages approval regions with region codes, names, associated currencies, and activation/deactivation status. The page features a DevExpress data grid with CRUD operations, import/export functionality, search capabilities, and bulk operations via checkboxes.

## Test Scenarios

### 1. Approval Region Master Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page Load and Navigation Verification

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Navigate to the Approval Region master page via URL https://coremasters.algorithms.com/ApprovalRegionPage/?stepType=Master&stepCode=APPROVALREGION&processCode=SECURITY
    - expect: Page should successfully load and redirect to login if not authenticated
    - expect: After authentication, should reach the Approval Region page
    - expect: Page title should display 'Approval Regions'
  2. Verify page breadcrumb and navigation elements
    - expect: Masters breadcrumb should be visible in the navigation menu
    - expect: Page heading should display 'Approval Regions'
    - expect: Menu button should be present and functional

#### 1.2. DevExpress Grid Data Validation with Virtualization Handling

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Inject CSS to disable DevExpress grid virtualization by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid elements
    - expect: CSS injection should complete successfully
    - expect: Grid virtualization should be disabled
  2. Wait for Blazor to re-render the grid after style injection and ensure grid stabilization
    - expect: Grid should re-render with all rows visible
    - expect: Grid should be stable and ready for counting
  3. Capture and parse console metadata message for grid dimensions
    - expect: Console should contain message 'Data grid with {n} rows and {n} columns'
    - expect: Message should be parsed using regex to extract row and column counts
    - expect: Console should show 'Data grid with 6 rows and 5 columns' (current state)
  4. Count actual rendered rows and columns in the DevExpress grid
    - expect: Grid should display exactly 6 data rows (excluding header)
    - expect: Grid should have 5 columns: Selection, Approval Region Code, Region Name, Currency Code, Deactivate
    - expect: All row data should be visible without scrolling
  5. Validate console metadata matches rendered grid counts
    - expect: Console row count must equal rendered row count (6 rows)
    - expect: Console column count must equal rendered column count (5 columns)
    - expect: Test should fail if counts do not match

#### 1.3. Grid Column Headers and Structure Verification

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Verify all grid column headers are present and correctly labeled
    - expect: Selection column should have checkbox for bulk selection
    - expect: Approval Region Code column should be sortable
    - expect: Region Name column should be sortable
    - expect: Currency Code column should be sortable
    - expect: Deactivate column should show checkbox controls
  2. Validate sample data content in grid rows
    - expect: Should see region data including IN (INDIA, INR), OM (OMAN, OMR), QTR (QATAR, QR)
    - expect: Should see SA (Saudi Arabia, SAR), UA (UNITED ARAB EMIRATES, AED), US (United States, USD)
    - expect: All Deactivate checkboxes should show 'false' status and be disabled
    - expect: Selection checkboxes should be interactive and unchecked by default

#### 1.4. Toolbar Actions and Button State Verification

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Verify main toolbar buttons and their initial states
    - expect: Edit button should be enabled and clickable
    - expect: Save button should be disabled initially
    - expect: Cancel button should be disabled initially
    - expect: Actions dropdown button should be enabled
  2. Verify secondary toolbar buttons and functionality
    - expect: Delete button should be disabled initially (no selection)
    - expect: Export button should be enabled with dropdown indicator
    - expect: Import button should be enabled with dropdown indicator
    - expect: View Options button should be enabled with dropdown indicator
  3. Verify search functionality
    - expect: Search box should be present and functional
    - expect: Search box should have proper placeholder text
    - expect: Clear search button should be visible

#### 1.5. Grid Selection and Row Operations

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Test individual row selection using checkboxes
    - expect: Clicking a row checkbox should select that specific row
    - expect: Selection status should update in grid status bar
    - expect: Delete button should become enabled when rows are selected
  2. Test bulk selection using master checkbox
    - expect: Master checkbox should select/deselect all visible rows
    - expect: Status bar should reflect total selected count
    - expect: All individual row checkboxes should toggle accordingly
  3. Verify 'Click here to add a new row' functionality
    - expect: New row placeholder should be visible at the top of data rows
    - expect: Should display appropriate add row icon and text
    - expect: Should be clickable for adding new entries

#### 1.6. Grid Status Bar Information Validation

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Verify grid status information display
    - expect: Status bar should show 'Data grid with 6 rows and 5 columns'
    - expect: Status bar should show '0 rows are selected' initially
    - expect: Row count should match actual data rows displayed
  2. Test status updates with row selection changes
    - expect: Selected row count should update dynamically in status bar
    - expect: Status should accurately reflect current selection state
    - expect: Status should reset to '0 rows are selected' when selection is cleared

#### 1.7. Edit Mode Functionality Verification

**File:** `tests/smoke/masters.approval-region.spec.ts`

**Steps:**
  1. Click Edit button to enter edit mode
    - expect: Edit button should become disabled
    - expect: Save and Cancel buttons should become enabled
    - expect: Grid should enter editable state
    - expect: Row data should become editable where appropriate
  2. Test Cancel functionality from edit mode
    - expect: Cancel button should revert any changes
    - expect: Grid should return to read-only state
    - expect: Edit button should become enabled again
    - expect: Save and Cancel buttons should become disabled
