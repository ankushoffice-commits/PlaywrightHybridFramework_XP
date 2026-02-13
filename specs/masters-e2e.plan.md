# Masters Tab E2E Test Plan

## Application Overview

This test plan covers end-to-end testing for the login process and verification of all sub-contents under the 'Masters' tab in the CoreMasters application. It ensures that a valid user can log in, navigate to the Masters section, and see all expected sub-contents.

## Test Scenarios

### 1. Masters Tab E2E Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login and verify all Masters sub-contents are present

**File:** `tests/masters-e2e.spec.ts`

**Steps:**
  1. Navigate to the login page at https://identity.algorithms.com/Account/Login.
    - expect: Login page is displayed with email and password fields.
  2. Enter valid email 'suraj.prajapati@algosoftware.com' and password 'Suraj@1994'.
    - expect: Email and password fields are filled.
  3. Click the 'Log in' button.
    - expect: User is logged in and redirected to the home page.
  4. Navigate to https://coremasters.algorithms.com/.
    - expect: Main application home page is displayed.
  5. Click the 'Masters' tab/menu item.
    - expect: Masters menu expands and sub-contents are visible.
  6. Verify the following sub-contents are present under Masters: Service Discovery, Company, Currencies and Exchange Rates, Unit Of Measure, Payment Terms, Project Template, External Entity Roles, External Entity Info Area, Approval Region, Countries and States, Project Organization Structure Elements, Prime Activity Group, Milestones, Approval Role, Prequalification Criteria, Tenure Master, VAT Groups, Caution Categories, Remarks, Training / Internal Levy Rate Maintenance, Value Limit, Clear Down Reasons, Country Data Entry, State Data Entry, Divisions, Regions, Shared Master Groups, Cost Analysis Setup, RegisterGrid Demo, PivotGrid Demo, Prime Activity, Prime Activity Classes, Revenue Analysis Setup, Resources, Xpedeon Parameters Update, Agreement Types, Work Order Type, VAT Tenure Setup, Distribution List Setup.
    - expect: All listed sub-contents are visible as links or menu items under Masters.
