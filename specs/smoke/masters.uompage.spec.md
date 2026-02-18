# Unit Of Measure (UOM) Masters Test Plan

## Application Overview

Comprehensive testing of the Unit of Measure (UOM) master data management functionality within the Algorithms CoreMasters application. The page provides CRUD operations for managing UOM records including UOM codes, descriptions, time units, unitary units, quantity precision, and deactivation status. The application uses DevExpress data grid components that require specific handling for virtualization and accurate data validation.

## Test Scenarios

### 1. UOM Grid Operations and Data Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. UOM-001: Grid loading and initial state validation

**File:** `tests/smoke/uom.grid.loading.spec.ts`

**Steps:**
  1. Navigate to the UOM page and wait for complete page load
    - expect: Page loads successfully
    - expect: UOM heading is visible
    - expect: DevExpress grid is rendered
  2. Inject CSS to disable DevExpress grid virtualization by modifying .dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, and .dxbl-grid styles to force full rendering
    - expect: CSS injection completes successfully
    - expect: Grid virtualization is disabled
    - expect: All rows are forced to render
  3. Wait for Blazor to re-render after style injection and validate grid stabilization
    - expect: Grid re-renders completely
    - expect: All data rows become visible
    - expect: Grid structure stabilizes
  4. Count total visible rows in the rendered grid
    - expect: Grid shows multiple UOM records
    - expect: Each row contains UOM data
    - expect: Grid displays proper column headers: UOM, Description, Time Unit, Unitary Unit, Quantity Precision, Deactivate
  5. Validate grid column structure and data types
    - expect: UOM column contains text codes
    - expect: Description column contains text descriptions
    - expect: Time Unit, Unitary Unit, and Deactivate columns contain checkboxes
    - expect: Quantity Precision column contains numeric values

#### 1.2. UOM-002: Console metadata validation and grid data consistency

**File:** `tests/smoke/uom.console.metadata.spec.ts`

**Steps:**
  1. Capture and parse console messages to extract grid metadata message 'Data grid with {n} rows and {n} columns'
    - expect: Console metadata message is found
    - expect: Row count and column count are extracted using regex
    - expect: Metadata indicates proper grid structure
  2. Compare console-reported row count with actual rendered grid row count
    - expect: Console row count matches rendered row count
    - expect: Both counts exclude header rows
    - expect: Data consistency is validated
  3. Compare console-reported column count with actual rendered grid column count
    - expect: Console column count matches rendered column count
    - expect: Column count equals 6 (UOM, Description, Time Unit, Unitary Unit, Quantity Precision, Deactivate)
    - expect: Grid structure matches metadata
  4. Validate failure condition when console vs rendered counts mismatch
    - expect: Test fails when console row count ≠ rendered row count
    - expect: Test fails when console column count ≠ rendered column count
    - expect: Detailed error message shows discrepancy

#### 1.3. UOM-003: UOM data validation and search functionality

**File:** `tests/smoke/uom.data.validation.spec.ts`

**Steps:**
  1. Validate sample UOM records are present (ABC, Box, CM, Bundle, etc.)
    - expect: Standard UOMs are visible in grid
    - expect: Each UOM has proper description
    - expect: Boolean fields display correct checkbox states
  2. Test search functionality by searching for specific UOM code (e.g., 'CM')
    - expect: Search box accepts input
    - expect: Grid filters to show matching records
    - expect: CM (Centimeter) record is displayed
  3. Clear search and verify all records return
    - expect: Search field clears
    - expect: Grid shows all UOM records
    - expect: Original data set is restored
  4. Validate multi-byte character support (Arabic unit 'arabunit')
    - expect: Arabic characters display correctly
    - expect: Grid handles Unicode properly
    - expect: Record shows 'وحدة القياس' description

#### 1.4. UOM-004: Row selection and grid interactions

**File:** `tests/smoke/uom.row.selection.spec.ts`

**Steps:**
  1. Click on first data row to select it
    - expect: Row becomes selected
    - expect: Radio button is checked
    - expect: Row highlighting is applied
  2. Select different row and verify selection changes
    - expect: Previous selection is cleared
    - expect: New row is selected
    - expect: Only one row can be selected at a time
  3. Verify checkbox states in selected row for Time Unit, Unitary Unit, and Deactivate columns
    - expect: Checkboxes display correct true/false states
    - expect: Disabled checkboxes are properly indicated
    - expect: Visual state matches data values
  4. Verify quantity precision values are displayed correctly
    - expect: Numeric values show proper precision
    - expect: Values like 0, 1 display correctly
    - expect: Precision formatting is consistent

#### 1.5. UOM-005: Toolbar operations and edit mode

**File:** `tests/smoke/uom.toolbar.operations.spec.ts`

**Steps:**
  1. Click Edit button in toolbar to enter edit mode
    - expect: Edit button is clicked
    - expect: Save and Cancel buttons become enabled
    - expect: Grid enters editable state
  2. Verify Save button functionality in edit mode
    - expect: Save button is enabled
    - expect: Save button is clickable
    - expect: Button state reflects edit mode
  3. Click Cancel button to exit edit mode
    - expect: Cancel button cancels edit mode
    - expect: Save and Cancel buttons become disabled
    - expect: Grid returns to read-only state
  4. Test Actions dropdown menu
    - expect: Actions button opens dropdown
    - expect: Dropdown shows available actions
    - expect: Menu items are accessible

#### 1.6. UOM-006: Grid export and import functionality

**File:** `tests/smoke/uom.import.export.spec.ts`

**Steps:**
  1. Click Export button in grid toolbar
    - expect: Export button is clickable
    - expect: Export operation initiates
    - expect: Export dropdown shows options if available
  2. Click Import button in grid toolbar
    - expect: Import button is clickable
    - expect: Import operation initiates
    - expect: Import functionality is accessible
  3. Test View Options button functionality
    - expect: View Options button opens settings
    - expect: Grid view options are available
    - expect: User can modify grid display settings
  4. Test Delete button state (should be disabled initially)
    - expect: Delete button is disabled when no row selected
    - expect: Button state reflects selection status
    - expect: Proper visual indication of disabled state

#### 1.7. UOM-007: Add new UOM functionality

**File:** `tests/smoke/uom.add.new.spec.ts`

**Steps:**
  1. Click on 'Click here to add a new row' area in grid
    - expect: Add new row interface appears
    - expect: New row entry mode is activated
    - expect: Input fields become available
  2. Enter test data for new UOM (code, description, boolean values, precision)
    - expect: UOM code field accepts input
    - expect: Description field accepts text
    - expect: Boolean fields can be toggled
    - expect: Precision field accepts numeric values
  3. Validate input field constraints and validation
    - expect: Required fields show validation
    - expect: Data types are enforced
    - expect: Field constraints are applied
  4. Save or cancel new UOM creation
    - expect: Save operation completes successfully or cancels properly
    - expect: Grid updates with new data or reverts
    - expect: User feedback is provided

#### 1.8. UOM-008: Error handling and edge cases

**File:** `tests/smoke/uom.error.handling.spec.ts`

**Steps:**
  1. Test grid behavior with empty search results
    - expect: Search with no matches shows empty grid
    - expect: No data message is displayed
    - expect: Grid maintains proper structure
  2. Test grid resilience with network issues or slow loading
    - expect: Grid handles loading states gracefully
    - expect: Error messages are displayed appropriately
    - expect: User can retry operations
  3. Test grid behavior with large data sets
    - expect: Grid performance remains acceptable
    - expect: Virtualization works correctly after CSS injection
    - expect: All data loads properly
  4. Validate accessibility features and keyboard navigation
    - expect: Grid is accessible via keyboard
    - expect: Screen reader support is available
    - expect: Focus management works properly
