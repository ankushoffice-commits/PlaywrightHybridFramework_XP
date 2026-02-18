# Payment Terms Master Management Test Plan

## Application Overview

Test plan for the Payment Terms Master page in the Algorithms CoreMasters application. This page manages payment term records with DevExpress data grid functionality, including CRUD operations, import/export capabilities, and advanced search features. The grid displays payment terms with attributes like code, description, payment method, credit period, and discount settings.

## Test Scenarios

### 1. Payment Terms Page Load and UI Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. should load Payment Terms page successfully

**File:** `tests/smoke/masters.payment-terms.page-load.spec.ts`

**Steps:**
  1. Navigate to https://coremasters.algorithms.com/PaymentTermsPage/?stepType=Master&stepCode=PAYTERMS&processCode=Masters
    - expect: Page should load successfully
    - expect: Page title should contain 'Payment Terms'
    - expect: Main heading should display 'Payment Terms'
  2. Validate main toolbar buttons presence
    - expect: Edit button should be visible and enabled
    - expect: Save button should be visible but disabled initially
    - expect: Cancel button should be visible but disabled initially
    - expect: Actions dropdown button should be visible and enabled
  3. Validate data manipulation toolbar
    - expect: Delete button should be visible but disabled initially
    - expect: Export button should be visible and enabled
    - expect: Import button should be visible and enabled
    - expect: View Options button should be visible and enabled
    - expect: Search box should be visible and functional

#### 1.2. should inject CSS to disable DevExpress grid virtualization

**File:** `tests/smoke/masters.payment-terms.grid-setup.spec.ts`

**Steps:**
  1. Inject CSS to disable virtualization for DevExpress grid components (.dxbl-grid-scroll-container, .dxbl-scroll-viewer, .dxbl-scroll-viewer-content, .dxbl-grid)
    - expect: CSS should be successfully injected
    - expect: Grid virtualization should be disabled
    - expect: All grid rows should be fully rendered and accessible
  2. Wait for Blazor to re-render after CSS injection
    - expect: Grid should stabilize after CSS injection
    - expect: All payment terms rows should be visible
    - expect: Grid should be ready for automation testing

### 2. DevExpress Grid Data Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. should validate grid structure and column headers

**File:** `tests/smoke/masters.payment-terms.grid-structure.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization and wait for stabilization
    - expect: Grid virtualization should be disabled
    - expect: All rows should be fully rendered
  2. Count and validate all column headers
    - expect: Should have exactly 7 columns: Selection, Code, Description, Payment Method, Credit Period Days, Early Settlement Discount, Deactivate
    - expect: All column headers should be visible and clickable for sorting
    - expect: Selection column should contain checkboxes
    - expect: Sort buttons should be present for sortable columns
  3. Count total number of rendered data rows
    - expect: Should count all payment terms data rows (excluding header and add-new-row)
    - expect: All rows should contain payment term data
    - expect: 'Click here to add a new row' option should be present

#### 2.2. should validate console and DOM grid metadata

**File:** `tests/smoke/masters.payment-terms.metadata.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization and ensure full rendering
    - expect: Grid should be fully rendered with all rows visible
  2. Capture and parse grid status from DOM element showing 'Data grid with {n} rows and {n} columns'
    - expect: Status element should display grid metadata
    - expect: Row count should be extracted using regex pattern
    - expect: Column count should be extracted using regex pattern
  3. Count actual rendered rows and columns in the grid
    - expect: Actual row count should match status metadata (35 rows expected)
    - expect: Actual column count should match status metadata (7 columns expected)
    - expect: Selected rows count should be displayed as '0 rows are selected' initially
  4. Validate data integrity between metadata and rendered content
    - expect: Status row count must equal actual rendered data rows
    - expect: Status column count must equal actual rendered columns
    - expect: Failure condition: Any mismatch between metadata and rendered grid should fail the test

### 3. Data Grid Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. should validate existing payment terms data

**File:** `tests/smoke/masters.payment-terms.data-validation.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization and wait for full rendering
    - expect: All payment terms data should be visible and accessible
  2. Validate sample payment terms records (A, ABC, C, CP0001, CP00010, etc.)
    - expect: Record 'A' should show: Code='A', Description='AB', Method='Net Monthly', Days='10', Discount='246.68', Deactivate='false'
    - expect: Record 'ABC' should show: Code='ABC', Description='ABC', Method='Invoice Date', Days='5', Discount='458.00', Deactivate='false'
    - expect: Record 'CP0013' should show deactivated status (Deactivate='true')
    - expect: All payment methods should be either 'Net Monthly' or 'Invoice Date'
    - expect: Credit period days should be numeric values (0-90 range observed)
  3. Validate data types and formats
    - expect: Code column should contain alphanumeric payment term codes
    - expect: Description column should contain descriptive text
    - expect: Credit Period Days should contain only numeric values
    - expect: Early Settlement Discount should contain decimal numbers
    - expect: Deactivate column should contain boolean checkboxes (checked/unchecked)

#### 3.2. should test row selection functionality

**File:** `tests/smoke/masters.payment-terms.selection.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization
    - expect: All payment terms rows should be selectable
  2. Select individual payment terms records using checkboxes
    - expect: Individual checkboxes should be clickable
    - expect: Selected rows should update the status display
    - expect: Status should show '{n} rows are selected'
    - expect: Delete button should become enabled when rows are selected
  3. Test master selection checkbox in header
    - expect: Master checkbox should select/deselect all records
    - expect: All individual checkboxes should reflect master selection state
    - expect: Status should reflect total selected count
  4. Clear selection
    - expect: Deselecting master checkbox should clear all selections
    - expect: Status should return to '0 rows are selected'
    - expect: Delete button should become disabled

### 4. Search and Filter Operations

**Seed:** `tests/seed.spec.ts`

#### 4.1. should test search functionality

**File:** `tests/smoke/masters.payment-terms.search.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization and ensure full data visibility
    - expect: All payment terms should be visible for search testing
  2. Search for specific payment term code (e.g., 'CP0001')
    - expect: Search should filter results to show matching records only
    - expect: Grid should display only records containing the search term
    - expect: Status should update to reflect filtered row count
  3. Search for payment method terms (e.g., 'Net Monthly')
    - expect: Results should show only records with matching payment methods
    - expect: Multiple matching records should be displayed
    - expect: Search should work across all text columns
  4. Clear search and verify full data restore
    - expect: Clearing search should restore all 35 payment terms records
    - expect: Grid status should return to full count
    - expect: All original data should be visible

#### 4.2. should test column sorting

**File:** `tests/smoke/masters.payment-terms.sorting.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization for full data access
    - expect: All rows should be available for sorting operations
  2. Sort by Code column (ascending and descending)
    - expect: Clicking Code header should sort records alphabetically
    - expect: Second click should reverse sort order
    - expect: Sort indicator should show current sort direction
  3. Sort by Description column
    - expect: Description column should sort alphabetically
    - expect: Sort should handle various text lengths and formats
    - expect: Empty or special characters should be handled appropriately
  4. Sort by numeric columns (Credit Period Days, Early Settlement Discount)
    - expect: Numeric columns should sort by numerical value, not lexicographically
    - expect: Zero values should be positioned correctly
    - expect: Decimal values should sort properly

### 5. CRUD Operations

**Seed:** `tests/seed.spec.ts`

#### 5.1. should test add new payment term functionality

**File:** `tests/smoke/masters.payment-terms.create.spec.ts`

**Steps:**
  1. Inject CSS to disable grid virtualization
    - expect: Grid should be ready for CRUD operations
  2. Click 'Click here to add a new row' option
    - expect: New row input fields should appear
    - expect: All required fields should be editable
    - expect: Save and Cancel buttons should become enabled
  3. Enter new payment term data (Code, Description, Payment Method, Credit Period Days, Discount)
    - expect: All fields should accept appropriate input
    - expect: Dropdown fields should show available options
    - expect: Validation should prevent invalid data entry
  4. Save new payment term record
    - expect: Record should be saved successfully
    - expect: New record should appear in the grid
    - expect: Grid status should increment row count by 1

#### 5.2. should test edit payment term functionality

**File:** `tests/smoke/masters.payment-terms.update.spec.ts`

**Steps:**
  1. Inject CSS for full grid visibility and click Edit button
    - expect: Edit mode should be activated
    - expect: Grid rows should become editable
    - expect: Save and Cancel buttons should be enabled
  2. Select and modify an existing payment term record
    - expect: Selected record fields should become editable
    - expect: Changes should be reflected in the input fields
    - expect: Data validation should apply to modified values
  3. Save modifications
    - expect: Changes should be saved successfully
    - expect: Modified data should persist in the grid
    - expect: Grid should exit edit mode
  4. Test Cancel functionality during edit
    - expect: Cancel button should discard unsaved changes
    - expect: Grid should revert to original state
    - expect: Edit mode should be deactivated

#### 5.3. should test delete payment term functionality

**File:** `tests/smoke/masters.payment-terms.delete.spec.ts`

**Steps:**
  1. Inject CSS to disable virtualization and select payment term record(s)
    - expect: Selected rows should be highlighted
    - expect: Delete button should become enabled
    - expect: Selection count should update
  2. Click Delete button
    - expect: Confirmation dialog should appear
    - expect: Delete operation should require confirmation
    - expect: User should be able to cancel deletion
  3. Confirm deletion
    - expect: Selected records should be removed from grid
    - expect: Grid row count should decrease accordingly
    - expect: Status should update to reflect new total

### 6. Import Export Operations

**Seed:** `tests/seed.spec.ts`

#### 6.1. should test export functionality

**File:** `tests/smoke/masters.payment-terms.export.spec.ts`

**Steps:**
  1. Inject CSS to ensure all data is accessible for export
    - expect: All 35 payment terms records should be available for export
  2. Click Export button
    - expect: Export options/dialog should appear
    - expect: Export should include all grid columns
    - expect: Export format options should be available (e.g., Excel, CSV)
  3. Execute export operation
    - expect: Export should complete successfully
    - expect: Downloaded file should contain all payment terms data
    - expect: Data integrity should be maintained in export format

#### 6.2. should test import functionality

**File:** `tests/smoke/masters.payment-terms.import.spec.ts`

**Steps:**
  1. Click Import button
    - expect: File upload dialog should appear
    - expect: Import should support standard formats (Excel, CSV)
    - expect: Template download option should be available
  2. Upload valid payment terms import file
    - expect: File should be validated before import
    - expect: Import preview should show data to be imported
    - expect: Validation errors should be displayed if present
  3. Complete import process
    - expect: Valid records should be imported successfully
    - expect: Grid should refresh with imported data
    - expect: Import summary should show success/error counts

### 7. Advanced Features and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 7.1. should test View Options functionality

**File:** `tests/smoke/masters.payment-terms.view-options.spec.ts`

**Steps:**
  1. Click View Options button
    - expect: View Options menu/dialog should appear
    - expect: Column visibility options should be available
    - expect: Grid layout customization options should be present
  2. Modify column visibility settings
    - expect: Hidden columns should disappear from grid
    - expect: Visible columns should remain accessible
    - expect: Grid should refresh with new column layout
  3. Reset view to default settings
    - expect: All default columns should be restored
    - expect: Grid should return to original layout
    - expect: All 7 columns should be visible

#### 7.2. should validate error handling and data integrity

**File:** `tests/smoke/masters.payment-terms.error-handling.spec.ts`

**Steps:**
  1. Inject CSS and test invalid data entry scenarios
    - expect: Required field validation should prevent empty submissions
    - expect: Invalid data formats should be rejected
    - expect: Duplicate payment term codes should be prevented
  2. Test grid behavior with network issues
    - expect: Loading states should be handled gracefully
    - expect: Error messages should be displayed appropriately
    - expect: Grid should recover when connection is restored
  3. Validate concurrent edit scenarios
    - expect: Concurrent edits should be handled appropriately
    - expect: Data conflicts should be resolved or reported
    - expect: Grid state should remain consistent
