# External Entity Info Area - Master Data Management

## Application Overview

Test plan for External Entity Info Area page - a DevExpress-based master data management interface for configuring external entity information areas with full CRUD operations, grid virtualization handling, and data validation capabilities.

## Test Scenarios

### 1. Grid Initialization and Virtualization

**Seed:** `tests/seed.spec.ts`

#### 1.1. DevExpress Grid Virtualization Disable and Validation

**File:** `tests/smoke/masters.ex_entity-info_area.grid-init.spec.ts`

**Steps:**
  1. Navigate to External Entity Info Area page
    - expect: Page loads successfully
    - expect: Page title shows 'External Entity Info Area'
    - expect: Grid container is visible
  2. Inject CSS to disable DevExpress grid virtualization by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid styles
    - expect: CSS injection successful
    - expect: Grid virtualization disabled
    - expect: All grid rows become immediately accessible
  3. Wait for Blazor to re-render after style injection and grid stabilization
    - expect: Grid re-renders completely
    - expect: All rows are rendered in DOM
    - expect: Grid reaches stable state
  4. Count total rendered rows in the grid programmatically
    - expect: All grid rows are counted
    - expect: Rendered row count is accurate
  5. Capture grid metadata from DOM status element showing 'Data grid with {n} rows and {n} columns'
    - expect: Grid metadata captured successfully
    - expect: Row and column counts extracted via regex
  6. Validate rendered row count matches metadata row count
    - expect: Console row count matches rendered row count
    - expect: Column count validation passes
    - expect: No discrepancies in data grid metrics

### 2. Page Navigation and Basic UI Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Page Header and Navigation Validation

**File:** `tests/smoke/masters.ex_entity-info_area.navigation.spec.ts`

**Steps:**
  1. Verify page loads at correct URL with parameters stepType=Master&stepCode=EXTENTITYRELATED&processCode=SECURITY
    - expect: URL parameters are correct
    - expect: Page loads without errors
    - expect: Authentication successful
  2. Validate breadcrumb navigation shows Masters section
    - expect: Masters breadcrumb is visible
    - expect: Navigation icons are displayed correctly
  3. Verify main page title displays 'External Entity Info Area'
    - expect: Page heading is correct
    - expect: Heading is properly positioned
  4. Check all toolbar buttons are present: Edit, Save, Cancel, Actions
    - expect: Edit button is enabled
    - expect: Save button is disabled
    - expect: Cancel button is disabled
    - expect: Actions dropdown is enabled

### 3. Type Selector and Dropdown Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Areas of Operation Dropdown Validation

**File:** `tests/smoke/masters.ex_entity-info_area.dropdown.spec.ts`

**Steps:**
  1. Verify Type selector shows 'Areas of Operation' as current selection
    - expect: Dropdown shows correct default value
    - expect: Dropdown is functional
  2. Click dropdown to open available options
    - expect: Dropdown opens successfully
    - expect: Available options are displayed
    - expect: Options list is not empty
  3. Validate all available type options in dropdown
    - expect: All type options are visible
    - expect: Options are properly formatted
    - expect: No duplicate entries
  4. Select different type option and verify grid updates
    - expect: Selection changes successfully
    - expect: Grid refreshes with relevant data
    - expect: Page context updates accordingly

### 4. Data Grid Structure and Content Validation

**Seed:** `tests/seed.spec.ts`

#### 4.1. Grid Column Structure and Headers

**File:** `tests/smoke/masters.ex_entity-info_area.grid-structure.spec.ts`

**Steps:**
  1. Verify grid has 4 columns: Selection, Code, Name, Deactivate
    - expect: All 4 column headers are present
    - expect: Column headers are correctly labeled
    - expect: Columns are properly sized
  2. Validate Selection column contains checkboxes for row selection
    - expect: Selection column header has master checkbox
    - expect: Each row has individual selection checkbox
    - expect: Checkboxes are functional
  3. Verify Code and Name columns support sorting indicated by sort buttons
    - expect: Code column has sort button
    - expect: Name column has sort button
    - expect: Sort buttons are clickable
  4. Check Deactivate column shows boolean values as checkboxes
    - expect: Deactivate column displays checkboxes
    - expect: Some checkboxes are checked (true)
    - expect: Some checkboxes are unchecked (false)

#### 4.2. Grid Data Validation and Sample Records

**File:** `tests/smoke/masters.ex_entity-info_area.data-validation.spec.ts`

**Steps:**
  1. After disabling virtualization, verify grid shows minimum expected data rows
    - expect: Grid contains multiple data rows
    - expect: No empty grid state
    - expect: Data is properly loaded
  2. Validate sample data entries like Abu Dhabi (Code: 10), Dubai (Code: 20), U.A.E. (Code: UAE)
    - expect: Sample location codes are present
    - expect: Location names match codes
    - expect: Different entity types are represented
  3. Check that some records show deactivated state (true) and others active state (false)
    - expect: Mixed deactivation states are present
    - expect: Deactivated records are clearly marked
    - expect: Status indicators work correctly
  4. Verify grid metadata status shows correct counts: 'Data grid with X rows and 4 columns'
    - expect: Grid status displays row count
    - expect: Column count shows 4
    - expect: Status updates with data changes

### 5. Grid Toolbar and Action Buttons

**Seed:** `tests/seed.spec.ts`

#### 5.1. Grid Toolbar Functionality Validation

**File:** `tests/smoke/masters.ex_entity-info_area.toolbar.spec.ts`

**Steps:**
  1. Verify Delete button is initially disabled when no rows are selected
    - expect: Delete button is disabled
    - expect: Button shows proper disabled state
    - expect: Tool tip shows selection requirement
  2. Validate Export button is enabled and functional
    - expect: Export button is enabled
    - expect: Export dropdown icon is present
    - expect: Button is clickable
  3. Check Import button is enabled with dropdown functionality
    - expect: Import button is enabled
    - expect: Import dropdown icon is present
    - expect: Import options are available
  4. Verify View Options button provides grid customization features
    - expect: View Options button is enabled
    - expect: Dropdown icon is present
    - expect: Options menu opens on click

### 6. Search and Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 6.1. Search Functionality Validation

**File:** `tests/smoke/masters.ex_entity-info_area.search.spec.ts`

**Steps:**
  1. Locate search box in grid toolbar
    - expect: Search input field is present
    - expect: Search input is functional
    - expect: Search icon/button is visible
  2. Enter search term 'Dubai' and verify grid filters results
    - expect: Search executes successfully
    - expect: Grid shows only Dubai-related results
    - expect: Row count updates in status
  3. Test search with different criteria like 'UAE' and verify filtering
    - expect: Search filters correctly for UAE
    - expect: Multiple matching records display if available
    - expect: Search is case-insensitive
  4. Clear search and verify all records return
    - expect: Search clears successfully
    - expect: Full dataset returns
    - expect: Grid status shows original row count

### 7. Row Selection and Deletion Operations

**Seed:** `tests/seed.spec.ts`

#### 7.1. Row Selection Functionality

**File:** `tests/smoke/masters.ex_entity-info_area.row-selection.spec.ts`

**Steps:**
  1. Select individual row by clicking row checkbox
    - expect: Row selection checkbox becomes checked
    - expect: Row is visually highlighted
    - expect: Selection count updates
  2. Verify Delete button becomes enabled after row selection
    - expect: Delete button changes to enabled state
    - expect: Button styling updates to active state
  3. Test master checkbox functionality to select all visible rows
    - expect: Master checkbox selects all rows
    - expect: All individual checkboxes become checked
    - expect: Selection count shows all rows
  4. Verify selection status shows correct count like '5 rows are selected'
    - expect: Selection status updates accurately
    - expect: Count reflects actual selected rows
    - expect: Status text is clear

### 8. Add New Row Functionality

**Seed:** `tests/seed.spec.ts`

#### 8.1. New Row Creation Validation

**File:** `tests/smoke/masters.ex_entity-info_area.new-row.spec.ts`

**Steps:**
  1. Locate 'Click here to add a new row' section in grid
    - expect: Add new row area is visible
    - expect: Add icon is present
    - expect: Text prompt is clear
  2. Click on add new row area to initiate row creation
    - expect: New row creation mode activates
    - expect: Input fields become available
    - expect: Add row interface opens
  3. Enter test data: Code='TEST01', Name='Test Entity', Deactivate=false
    - expect: Code field accepts input
    - expect: Name field accepts input
    - expect: Deactivate checkbox is functional
  4. Save new row and verify it appears in grid data
    - expect: New row saves successfully
    - expect: Row appears in grid
    - expect: Grid row count increases

### 9. Edit Mode and Save Operations

**Seed:** `tests/seed.spec.ts`

#### 9.1. Edit Mode Functionality Validation

**File:** `tests/smoke/masters.ex_entity-info_area.edit-mode.spec.ts`

**Steps:**
  1. Click Edit button in main toolbar to enter edit mode
    - expect: Edit mode activates
    - expect: Save button becomes enabled
    - expect: Cancel button becomes enabled
  2. Modify existing record data - change name or deactivate status
    - expect: Fields become editable
    - expect: Changes are captured
    - expect: Modified data is retained
  3. Click Save button to persist changes
    - expect: Save operation completes
    - expect: Changes are saved
    - expect: Edit mode deactivates
    - expect: Buttons return to default state
  4. Verify saved changes persist after page refresh
    - expect: Modified data remains after refresh
    - expect: Changes are permanently saved
    - expect: Grid reflects updated information
