# Milestones Master - Smoke Test Plan

## Application Overview

Test plan for the Milestones master page in CoreMasters application. This page manages milestone configurations with sequence numbers, codes, names, internal/external classifications, nature, procurement plan settings, lead time driven flags, and activation/deactivation status. The page features a DevExpress data grid with CRUD operations, import/export functionality, search capabilities, and bulk operations via checkboxes.

## Test Scenarios

### 1. Milestones Master Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Page Load and Navigation Verification

**File:** `tests/smoke/masters.milestones.spec.ts`

**Steps:**
  1. Navigate to the Milestones master page via URL https://coremasters.algorithms.com/ENQMILESTONE?stepType=Master&stepCode=ENQMILESTONE&processCode=Masters
    - expect: Page should successfully load and redirect to login if not authenticated
    - expect: After authentication, should reach the Milestones page
    - expect: Page title should display 'Milestones'
  2. Verify page breadcrumb and navigation elements
    - expect: Masters breadcrumb should be visible in the navigation menu
    - expect: Page heading should display 'Milestones'
    - expect: Menu button should be present and functional

#### 1.2. DevExpress Grid Data Validation with Virtualization Handling

**File:** `tests/smoke/masters.milestones.spec.ts`

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
    - expect: Console should show 'Data grid with 3 rows and 9 columns' (current state)
  4. Count actual rendered rows and columns in the DevExpress grid
    - expect: Grid should display exactly 3 data rows (excluding header)
    - expect: Grid should have 9 columns: Selection, Seq No., Code, Name, Internal/External, Nature, Procurement Plan, Lead Time Driven, Deactivate
    - expect: All row data should be visible without scrolling
  5. Validate console metadata matches rendered grid counts
    - expect: Console row count must equal rendered row count (3 rows)
    - expect: Console column count must equal rendered column count (9 columns)
    - expect: Test should fail if counts do not match

#### 1.3. Grid Column Headers and Structure Verification

**File:** `tests/smoke/masters.milestones.spec.ts`

**Steps:**
  1. Verify all grid column headers are present and correctly labeled
    - expect: Selection column should have checkbox for bulk selection
    - expect: Seq No. column should be sortable with numeric values
    - expect: Code column should be sortable
    - expect: Name column should be sortable
    - expect: Internal/External column should show dropdown values
    - expect: Nature column should be sortable
    - expect: Procurement Plan column should show plan types
    - expect: Lead Time Driven column should show Yes/No values
    - expect: Deactivate column should show checkbox controls
  2. Validate sample data content in grid rows
    - expect: Should see milestone data including Test32, Test33, and test entries
    - expect: Should display sequence numbers like 90, 91, 93
    - expect: Should show Internal/External classifications as External
    - expect: Should show Nature values like Post Order and Pre Order
    - expect: Should show Lead Time Driven values as Yes/No
    - expect: Deactivate checkboxes should show true/false status

#### 1.4. Toolbar Actions and Button State Verification

**File:** `tests/smoke/masters.milestones.spec.ts`

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

**File:** `tests/smoke/masters.milestones.spec.ts`

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

**File:** `tests/smoke/masters.milestones.spec.ts`

**Steps:**
  1. Verify grid status information display
    - expect: Status bar should show 'Data grid with 3 rows and 9 columns'
    - expect: Status bar should show '0 rows are selected' initially
    - expect: Row count should match actual data rows displayed
  2. Test status updates with row selection changes
    - expect: Selected row count should update dynamically in status bar
    - expect: Status should accurately reflect current selection state
    - expect: Status should reset to '0 rows are selected' when selection is cleared

#### 1.7. Milestone Data Fields Validation

**File:** `tests/smoke/masters.milestones.spec.ts`

**Steps:**
  1. Validate milestone sequence and identification fields
    - expect: Seq No. should contain numeric values (90, 91, 93)
    - expect: Code values should include Test32, Test33, test
    - expect: Name field should show descriptive text like 'Test name', 'tttt'
    - expect: Internal/External should display 'External' classification
  2. Validate milestone configuration and status fields
    - expect: Nature field should show 'Post Order' and 'Pre Order' values
    - expect: Procurement Plan should display 'No' and 'Yes' values
    - expect: Lead Time Driven should show 'Yes' and 'No' options
    - expect: Deactivate checkboxes should show true/false and be properly disabled

#### 1.8. Edit Mode Functionality Verification

**File:** `tests/smoke/masters.milestones.spec.ts`

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
