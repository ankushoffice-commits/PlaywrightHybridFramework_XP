# Remarks Master Management Test Plan

## Application Overview

Comprehensive testing of the Remarks master management page in CoreMasters application. The page provides functionality to manage system remarks with CRUD operations, import/export capabilities, and data grid interactions. This includes proper DevExpress grid handling with virtualization disabled for reliable automation.

## Test Scenarios

### 1. Remarks Master Management

**Seed:** `tests/seed.spec.ts`

#### 1.1. Grid Initialization and Console Metadata Validation

**File:** `tests/smoke/masters.remarks.spec.ts`

**Steps:**
  1. Navigate to Remarks page and inject CSS to disable DevExpress grid virtualization
    - expect: Page should load with 'Remarks' heading visible
    - expect: CSS injection should modify .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid elements
    - expect: Grid should be fully rendered without virtualization
  2. Wait for Blazor re-render after style injection and verify grid stabilization
    - expect: All grid rows should be visible in DOM
    - expect: Grid should display complete data set
    - expect: No loading indicators should be present
  3. Capture and validate grid metadata from status element using regex pattern
    - expect: Status element should display 'Data grid with {n} rows and {n} columns' message
    - expect: Metadata should indicate 20 rows and 3 columns
    - expect: Selection status should show '0 rows are selected'
  4. Count actual rendered grid rows and columns in DOM
    - expect: Rendered row count should match console metadata (20 rows)
    - expect: Rendered column count should match console metadata (3 columns)
    - expect: Grid should have Selection, Remarks, and Deactivate columns

#### 1.2. Grid Data Verification and Navigation

**File:** `tests/smoke/masters.remarks.spec.ts`

**Steps:**
  1. Verify grid column headers and structure
    - expect: Selection column should contain checkboxes for row selection
    - expect: Remarks column should display text content with sorting capability
    - expect: Deactivate column should show boolean checkboxes (read-only)
  2. Validate sample data in grid rows
    - expect: Grid should contain existing remarks like 'Test Remark via Import Test', 'Action completed; no further steps required'
    - expect: One row should show 'Changes applied and saved in the system.' with deactivate value as true (checked)
    - expect: All other rows should show deactivate value as false (unchecked)
  3. Verify breadcrumb navigation elements
    - expect: Masters section should be visible and clickable
    - expect: Global Tax Management section should be displayed
    - expect: Subcontracting and Cvr sections should be available
    - expect: Current page should show 'Remarks' heading

#### 1.3. Toolbar Functionality and State Management

**File:** `tests/smoke/masters.remarks.spec.ts`

**Steps:**
  1. Verify initial toolbar state and button availability
    - expect: Edit button should be enabled and clickable
    - expect: Save button should be disabled initially
    - expect: Cancel button should be disabled initially
    - expect: Actions button should be enabled with dropdown functionality
  2. Test Export and Import button functionality
    - expect: Export button should be enabled and display dropdown indicator
    - expect: Import button should be enabled and display dropdown indicator
    - expect: View Options button should be available with dropdown
  3. Verify secondary toolbar controls
    - expect: Delete button should be disabled initially
    - expect: Search functionality should be available with search box
    - expect: Search button should be present next to search input

#### 1.4. CRUD Operations and Data Entry

**File:** `tests/smoke/masters.remarks.spec.ts`

**Steps:**
  1. Click on 'Click here to add a new row' functionality
    - expect: New row entry should become available
    - expect: Row should be in edit mode for data entry
    - expect: Save and Cancel buttons should become enabled
  2. Test row selection functionality with checkboxes
    - expect: Individual row checkboxes should be selectable
    - expect: Selection status should update to show selected count
    - expect: Delete button should become enabled when rows are selected
  3. Verify Edit mode activation
    - expect: Edit button should enable grid editing capabilities
    - expect: Save button should become enabled in edit mode
    - expect: Cancel button should become enabled to discard changes

#### 1.5. Search and Filtering Functionality

**File:** `tests/smoke/masters.remarks.spec.ts`

**Steps:**
  1. Test search functionality with various terms
    - expect: Search box should accept text input
    - expect: Grid should filter results based on search criteria
    - expect: Clear search should restore full data set
  2. Verify column sorting capabilities
    - expect: Remarks column should support ascending/descending sort
    - expect: Deactivate column should support boolean sorting
    - expect: Sort indicators should be visible on column headers
  3. Test View Options functionality
    - expect: View Options dropdown should provide grid customization
    - expect: Column visibility options should be available
    - expect: Grid layout preferences should be configurable
