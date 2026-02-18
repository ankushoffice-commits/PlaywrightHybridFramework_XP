# Project Templates Management Test Plan

## Application Overview

Test plan for the Project Templates Management application at https://coremasters.algorithms.com/ProjectTemplatesPage?stepType=Master&stepCode=PROJTEMPLATE&processCode=Masters. This is a Blazor WebAssembly application using dual DevExpress data grids for managing project template master data and associated projects. The application features two independent grids with virtualization, CRUD operations, filtering, export/import capabilities, company selection, and comprehensive project template management with analysis code structures.

## Test Scenarios

### 1. DevExpress Dual Grid Validation and Console Metadata

**Seed:** `tests/seed.spec.ts`

#### 1.1. DevExpress Grid Virtualization Handling

**File:** `tests/smoke/project-template-grid-virtualization.spec.ts`

**Steps:**
  1. Inject CSS to disable DevExpress grid virtualization for both Templates and Projects List grids by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid styles
    - expect: CSS injection successfully disables virtualization for both grids
    - expect: Grid container styles are modified for Templates grid
    - expect: Grid container styles are modified for Projects List grid
    - expect: Virtualization is completely disabled for both grids
  2. Wait for Blazor to re-render after style injection and both grids to stabilize
    - expect: Blazor re-rendering is complete
    - expect: Templates grid UI is stabilized
    - expect: Projects List grid UI is stabilized
    - expect: All rows are now visible in DOM for both grids
  3. Force full rendering for both grids by ensuring all data rows are loaded
    - expect: All template records are visible in Templates grid DOM
    - expect: All project records are visible in Projects List grid DOM
    - expect: Both grids display complete datasets
    - expect: No lazy loading artifacts remain in either grid
  4. Count total rendered rows and columns for Templates grid (expected: variable rows, 3 columns including selection)
    - expect: Accurate count of visible Templates data rows
    - expect: Templates row count includes all template records
    - expect: Templates column count matches grid schema (Selection, Code, Name)
    - expect: Count excludes header and footer rows
  5. Count total rendered rows and columns for Projects List grid (expected: variable rows, 11 columns)
    - expect: Accurate count of visible Projects List data rows
    - expect: Projects List row count includes all project records
    - expect: Projects List column count matches grid schema (Select, Code, Name, Currency, State Name, L1-L5 Analysis Codes, Framework Contract)
    - expect: Count excludes header and footer rows

#### 1.2. Console Metadata Validation for Dual Grids

**File:** `tests/smoke/project-template-console-metadata.spec.ts`

**Steps:**
  1. Capture browser console messages programmatically
    - expect: Console messages are successfully captured
    - expect: Message log contains grid metadata for both grids
    - expect: No console capture errors occur
  2. Parse console messages using regex to extract 'Data grid with {n} rows and {n} columns' metadata for Templates grid
    - expect: Templates console message is found and parsed
    - expect: Templates row and column numbers are extracted correctly
    - expect: Console message format matches expected pattern
  3. Parse console messages using regex to extract 'Data grid with {n} rows and {n} columns' metadata for Projects List grid
    - expect: Projects List console message is found and parsed
    - expect: Projects List row and column numbers are extracted correctly
    - expect: Console message format matches expected pattern
  4. Compare console metadata with rendered Templates grid counts
    - expect: Console Templates row count equals rendered Templates row count
    - expect: Console Templates column count equals rendered Templates column count
    - expect: Metadata validation passes for Templates grid
  5. Compare console metadata with rendered Projects List grid counts
    - expect: Console Projects List row count equals rendered Projects List row count
    - expect: Console Projects List column count equals rendered Projects List column count
    - expect: Metadata validation passes for Projects List grid

### 2. Project Templates Interface and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Page Structure and Company Selection

**File:** `tests/smoke/project-template-page-structure.spec.ts`

**Steps:**
  1. Verify Project Templates page loads with correct title and URL
    - expect: Page displays 'Project Templates' heading
    - expect: URL contains ProjectTemplatesPage with correct query parameters
    - expect: Page navigation breadcrumb is visible and correct
  2. Verify Company dropdown is present and functional
    - expect: Company combobox is visible and accessible
    - expect: Dropdown can be opened and closed
    - expect: Company selection affects grid data loading
  3. Verify Templates section structure and collapse functionality
    - expect: Templates group is visible with correct heading
    - expect: Collapse/expand button is functional and responsive
    - expect: Templates grid and toolbar are properly displayed
  4. Verify Projects List section structure and collapse functionality
    - expect: Projects List group is visible with correct heading
    - expect: Collapse/expand button is functional and responsive
    - expect: Projects List grid and toolbar are properly displayed

#### 2.2. Templates Grid Toolbar Functionality

**File:** `tests/smoke/project-template-templates-toolbar.spec.ts`

**Steps:**
  1. Verify Templates grid toolbar buttons are present and accessible
    - expect: Delete button is visible (may be disabled when no selection)
    - expect: Export button is visible and clickable
    - expect: Import button is visible and clickable
    - expect: View Options button is visible and clickable
  2. Test Templates grid search functionality
    - expect: Search box is visible and accepts input
    - expect: Search button functions correctly
    - expect: Search results filter grid data appropriately
  3. Verify Templates grid column headers and sorting
    - expect: Selection column header is present
    - expect: Code column header is present and sortable
    - expect: Name column header is present and sortable
    - expect: All column sort buttons are functional
  4. Test Templates grid Export functionality
    - expect: Export button triggers download dialog
    - expect: Export process completes successfully
    - expect: Exported data matches grid content

#### 2.3. Projects List Grid Toolbar Functionality

**File:** `tests/smoke/project-template-projects-toolbar.spec.ts`

**Steps:**
  1. Verify Projects List grid toolbar buttons are present and accessible
    - expect: Export button is visible and clickable
    - expect: Import button is visible and clickable
    - expect: View Options button is visible and clickable
  2. Test Projects List grid search functionality
    - expect: Search box is visible and accepts input
    - expect: Search button functions correctly
    - expect: Search results filter grid data appropriately
  3. Verify Projects List grid column headers and sorting
    - expect: Select column header is present and functional
    - expect: Code, Name, Currency, State Name columns are present and sortable
    - expect: L1-L5 Analysis Code columns are present and sortable
    - expect: Framework Contract column is present and sortable
    - expect: All column sort buttons are functional
  4. Test Projects List grid Export functionality
    - expect: Export button triggers download dialog
    - expect: Export process completes successfully
    - expect: Exported data matches grid content

### 3. Main Page Toolbar and CRUD Operations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Main Toolbar Functionality

**File:** `tests/smoke/project-template-main-toolbar.spec.ts`

**Steps:**
  1. Verify main page toolbar buttons are present and accessible
    - expect: Edit button is visible and clickable
    - expect: Save button is visible (may be disabled)
    - expect: Cancel button is visible (may be disabled)
    - expect: Actions dropdown button is visible and clickable
  2. Test Edit mode activation
    - expect: Edit button enables editing mode
    - expect: Save and Cancel buttons become enabled
    - expect: Grid editing features become available
    - expect: Form fields become editable
  3. Test Actions dropdown menu functionality
    - expect: Actions dropdown opens when clicked
    - expect: Menu contains appropriate action items
    - expect: Menu actions are functional and responsive
    - expect: Dropdown closes after selection
  4. Test Save and Cancel operations
    - expect: Save button commits changes when clicked
    - expect: Cancel button discards changes and exits edit mode
    - expect: Buttons return to disabled state after operation
    - expect: Grid data reflects save/cancel actions appropriately

#### 3.2. Templates Grid CRUD Operations

**File:** `tests/smoke/project-template-templates-crud.spec.ts`

**Steps:**
  1. Test Templates grid new row creation
    - expect: Click here to add a new row option is functional
    - expect: New row appears when clicked
    - expect: Row accepts data input in Code and Name fields
    - expect: Row validation works correctly
  2. Test Templates grid row selection and deletion
    - expect: Rows can be selected using checkboxes
    - expect: Delete button becomes enabled when row is selected
    - expect: Delete operation removes selected rows
    - expect: Grid updates correctly after deletion
  3. Test Templates grid data editing
    - expect: Existing rows can be edited in-place
    - expect: Data changes are reflected in grid
    - expect: Validation prevents invalid data entry
    - expect: Edit operations integrate with main Save/Cancel workflow
  4. Test Templates grid Import functionality
    - expect: Import button triggers file selection dialog
    - expect: Valid files are processed correctly
    - expect: Import errors are handled appropriately
    - expect: Grid data reflects imported records

### 4. Data Validation and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 4.1. Form Validation and Data Integrity

**File:** `tests/smoke/project-template-validation.spec.ts`

**Steps:**
  1. Test Company selection validation
    - expect: Company dropdown requires selection
    - expect: Invalid company selection shows appropriate error
    - expect: Company change updates both grids appropriately
    - expect: Validation messages are clear and helpful
  2. Test Templates grid field validation
    - expect: Code field validates for required input
    - expect: Name field validates for required input
    - expect: Duplicate codes are prevented
    - expect: Field length limits are enforced
  3. Test Projects List grid data consistency
    - expect: Project data remains consistent with template selection
    - expect: Currency field shows valid currency codes
    - expect: Analysis codes validate against system data
    - expect: State names are validated appropriately
  4. Test error handling for network failures
    - expect: Network errors display appropriate messages
    - expect: Retry mechanisms work correctly
    - expect: Data integrity is maintained during errors
    - expect: User can recover from error states
